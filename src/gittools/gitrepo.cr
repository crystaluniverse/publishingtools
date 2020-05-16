require "file_utils"

module TFWeb
  HTTP_REPO_URL = /(https:\/\/)?(?P<provider>.+)(?P<suffix>\..+)\/(?P<account>.+)\/(?P<repo>.+)/
  SSH_REPO_URL  = /git@(?P<provider>.+)(?P<suffix>\..+)\:(?P<account>.+)\/(?P<repo>.+).git/

  # represents 1 specific repo on git, http & ssh can be used for updating the info
  # have nice enduser friendly operational message when it doesn't work
  class GITRepo
    property name : String
    property path : String
    property url : String
    property autocommit = false
    property branch = "master"
    property branchswitch = false
    property account = ""
    property provider = "github"
    property provider_suffix = ".com"
    property environment = "production"
    property codedir = "~/tfweb"
    property depth = 1

    def initialize(@name = "", @path = "", @url = "", @branch = "master", @branchswitch = false, @environment = "production", @depth = 1)
      # TODO: check if ssh-agent loaded, if yes use git notation, otherwise html
      #   @url = "" # TODO: fill in the right url (git or http), if http no authentication
      if @path == "" && @url == ""
        error "path and url are empty #{name}"
      end

      #
      if @path != ""
        url_on_fs = try_read_url_from_path
        #give url on fs priority
        if url_on_fs !=""
          @url = url
        end
      end

      #put https in front if its not done yet
      if @url != ""
        if !@url.includes?("@") && !@url.starts_with?("https://")
          @url = "https://#{@url}"
        end
      else
        error "cannot initialize git repository if url not given: #{url}"
      end

      #initialize the git environment, parse the separate properties
      parse_provider_account_repo()

      if sshagent_loaded
        @url = url_as_ssh
      else
        @url = url_as_https
      end

      pp @url
      exit 0

      #make sure the repository exists
      dir_repo_ensure()

    end

    private def error(msg)
      puts msg
      exit 1
    end 

    #returns true if sshagent is loaded with at least 1 key
    private def sshagent_loaded
      `ssh-add -l &>/dev/null`
      $?.success?
    end    

    #fetch the url from git config, if not exist return ''
    private def try_read_url_from_path
      res = `cd #{@path} && git config --get remote.origin.url`
      if $?.success?
        res.chomp
      else
        ""
      end
    end

    #return the git url as https
    private def url_as_https
      "https://#{@provider}#{@provider_suffix}/#{@account}/#{@name}"
    end

    #return the url in git ssh format
    private def url_as_ssh
      "git@#{@provider}:#{@account}/#{@name}"
    end

    def base_dir
      "#{@codedir}/#{@environment}/"
    end

    #location of the git repository
    def dir_repo
      @path = Path["#{base_dir}/#{@provider}/#{@account}/#{name}"].expand(home: true).to_s
    end

    #make sure the directory exists
    private def dir_repo_ensure
      d = dir_repo()
      Dir.mkdir_p(d)
      d
    end

    private def dir_account_ensure
      d = Path["#{base_dir}/#{@provider}/#{@account}"].expand(home: true)
      Dir.mkdir_p(d)
      d
    end

    # def rewrite_http_to_ssh_url
    #   rewritten_url = @url # let's assume ssh is the default.
    #   parse_provider_account_repo()
    #   url_as_ssh(@provider, @account, @reponame)
    # end

    private def parse_provider_account_repo
      account_dir = ""
      rewritten_url = @url # let's assume ssh is the default.
      if @url.starts_with?("http")
        m = HTTP_REPO_URL.match(@url)
        m.try do |validm|
          @provider = validm.not_nil!["provider"].to_s
          @provider_suffix = validm.not_nil!["suffix"].to_s
          @account = validm.not_nil!["account"].to_s
          @name = validm.not_nil!["repo"].to_s
          account_dir = dir_account_ensure()
          @path = File.join(account_dir, @name)
        end
      else
        if @url.starts_with?("git@")
          m = SSH_REPO_URL.match(@url)
          m.try do |validm|
            @provider = validm.not_nil!["provider"].to_s
            @account = validm.not_nil!["account"].to_s
            @name = validm.not_nil!["repo"].to_s
            account_dir = dir_account_ensure()
            @path = File.join(account_dir, name)
          end
        end
      end
    end

    def pull()
      `cd #{dir_repo} && git pull`
      if not $?.success?
        raise "could not pull repo: #{dir_repo}"
      end
      if @branch && @branchswitch
        `cd #{dir_repo} && git checkout #{@branch}`
      end
    end

    #will reset the repo, means create if not exists
    #will then reset to right branch & pull all changes
    #DANGEROUS: local changes will be overwritten
    def reset()
      `cd #{repo_path} && git clean -xfd && git checkout . && git checkout #{branch} && git pull`
      if not $?.success?
        raise "could not reset repo: #{dir_repo}"
      end
    end

    #make sure the repository exists, if not will pull
    def repo_ensure()
      unless Dir.exists?(@path)
        account_dir = dir_account_ensure()
        puts "cloning into #{@path} (dir did not exist)"  
        if @depth!=0
          `cd #{account_dir} && git clone #{@urll} --depth=1 && cd #{@name} && git fetch`
        else
          `cd #{account_dir} && git clone #{@urll}`
        end
        pull()
      end

      File.join(account_dir, @name)
    end

    # pull if needed, update if the directory is already there & .git found
    # clone if directory is not there
    # if there is data in there, ask to commit, ask message if @autocommit is on
    # if branchname specified, check branchname is the same, if not and @branchswitch is True switch branch, otherwise error
    def pull(force = false)
      unless Dir.exists?(@path)
        repo_ensure() # handles the cloning, existence and the correct branch already.
      end
      if force
        reset()
      else
        `cd #{repo_path} && git pull`
        $?.success?
      end
    end

    # return the branchname from the repo on the filesystem, if it doesn't exist yet do an update
    private def branch_get
      raise "not implemented"
    end

    # check the local repo and compare to remote, if there is newer info remote return True, otherwise False
    def check_is_new
      raise "not implemented"
    end

    # def has_sshagent
    #   `ps aux | grep -v grep | grep ssh-agent`
    #   $?.success?
    # end

    # delete the repo
    def delete
      FileUtils.rm_rf(@path)
    end

    # commit the new info, automatically do an add of all files
    def commit(msg : String)
      `cd #{repo_path} && git add -u && git commit -m #{msg}`
    end

    #commit, pull, push
    def commit_pull_push(msg : String)
      `cd #{repo_path} && git add -u && git commit -m #{msg}`
      pull()
      push()
    end

    def push
      `cd #{repo_path} && git push`
    end

  end
end
