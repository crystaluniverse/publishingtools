# file: help.cr
require "option_parser"
require "toml"

module TFWeb
  module CLI
    # def self.process_book
    #   input = STDIN.gets_to_end
    #   if input.empty?
    #     return
    #   end

    #   File.write("tmp.json", input)

    #   preprocessor = MdBook::Preprocessor.new(input)
    #   preprocessor.process
    #   preprocessor.to_json(STDOUT)
    # end

    def self.main

      ws = WebServer.new
      ws.serve

      # mddocs = MarkdownDocs.new(docspath : docspath)
      # WebServer(mddocs : mddocs,serverport : serverport)

      # server = false
      # docspath = ""
      # fix = false
      # serverport = 3000

      # OptionParser.parse! do |parser|
      #   parser.banner = "Usage: TFWeb [arguments]"
      #   parser.on("-p PORT", "--port=PORT", "Port to run server on") { |port| serverport = port.to_i }
      #   parser.on("-d WIKIPATH", "--dir=WIKIPATH", "Wiki dir root") { |wikipath| docspath = wikipath }
      #   parser.on("-f", "--fix", "fix a dir") { fix = true }
      #   parser.on("-s", "--server", "starts server") { server = true }
      #   parser.on("-h", "--help", "Show this help") { puts parser }
      # end

      # if docspath != ""
        # if server
        #   mddocs = MarkdownDocs.new(docspath=docspath)
        #   WebServer(mddocs : mddocs,serverport=serverport)
        # elsif fix
        #   w = Walker.new
        #   w.check_dups(docspath)
        #   w.fixer(docspath)
        #   # puts "errors #{w.errors}"
        #   w.errors_as_md(docspath)
        # end
      # end
    end
  end
end