# Publishing tools
Publishing tools consist of multiple things a wiki and static websites server, ssh tunneling tools used for deployments mainly.

## install



- binaries on e.g. https://github.com/threebotserver/publishingtools/releases/tag/v1.0.0-alpha.4

## tfweb

`tfweb` is a wiki server/static websites server mainly built to drive the websites infrastructure for [threefold.io](https://threefold.io)

### Configurations

tfweb config is toml based, to provide more expressive configurations languages and less confusing switches/command line options.

there are 2 env variables

```bash
#will make sure git gets updated when webserver starts
export GIT_UPDATE=1
#will show debug info
export DEBUG=1
```


#### Server config section
```toml
[server]
port = 3000
addr = "0.0.0.0"
```
Sets the binding `address` to `0.0.0.0` and the `port` to `3000`

#### Wiki config section

tfweb allows serving multiple wikis, with unique names. by specifying the `url` "the most common case" or the `path` on the filesystem, and the wiki source directory `srcdir`

- `title` title of the wiki (default: `name` value)
- `url` can be ssh url or https url
- `path` is the path of the top level root of the repository on the filesystem
- `srcdir` is where the wiki dir starts in the repository
- `branch` you can specify the branch to use
- `branchswitch` forces switching to `branch` if the one on the filesystem is different.
- `environment` enviroment name, if defined repos will be cloned under `~/tfweb/{environment}/`.

```toml
[[wiki]]
#unique name for the wiki
name = "sdk"
title = "SDK Wiki"
#http or git url
url = "github.com/threefoldfoundation/info_tfgridsdk"
#if empty will be auto created
path = ""
#commit automatically when there is new info, only works when ssh used
autocommit = false
#branch name, of "" then will be the default or what is found on the FS
branch = "development"
#switch branch automatically if the name given above and its different on FS
branchswitch = false
#path in the repo where the info is, std "src"
srcdir = "src"
#environment name (for example:  production, staging, testing)
environment = "production"
```

#### Website config section

```toml
#website
[[www]]
name = "freetft"
#http or git url
url = "git@github.com:threefoldfoundation/www_getfreetft.git"
#if empty will be auto created
path = ""
#commit automatically when there is new info, only works when ssh used
autocommit = false
#branch name, of "" then will be the default or what is found on the FS
branch = "development"
#switch branch automatically if the name given above and its different on FS
branchswitch = true
#path in the repo where the info is, std "src"
srcdir = ""
#environment name (for example:  production, staging, testing)
environment = "production"
```
the same as wiki, but in `[[www]]` array instead, used to serve static websites



#### Example configurations


```toml
[server]
port = 3000
addr = "0.0.0.0"

[[wiki]]
#unique name for the wiki
name = "sdk"
#http or git url
url = "github.com/threefoldfoundation/info_tfgridsdk"
#if empty will be auto created
path = ""
#commit automatically when there is new info, only works when ssh used
autocommit = false
#branch name, of "" then will be the default or what is found on the FS
branch = "development"
#switch branch automatically if the name given above and its different on FS
branchswitch = false
#path in the repo where the info is, std "src"
srcdir = "src"
#environment name (for example:  production, staging, testing)
environment = "production"

[[wiki]]
#unique name for the wiki
name = "wiki"
#http or git url
url = "https://github.com/threefoldfoundation/info_threefold"
#if empty will be auto created
path = ""
#commit automatically when there is new info, only works when ssh used
autocommit = false
#branch name, of "" then will be the default or what is found on the FS
branch = "development"
#switch branch automatically if the name given above and its different on FS
branchswitch = false
#path in the repo where the info is, std "src"
srcdir = "src"
#environment name (for example:  production, staging, testing)
environment = "production"

```

### Building


#### ubuntu machine setup

make sure you have the following `apt-get install -y build-essential curl libevent-dev libssl-dev libxml2-dev libyaml-dev libgmp-dev git libssh2 libssh2-dev`

building is as simple as `shards build` or `shards build --error-trace` to allow more error traces information


### Running

After building you will find the binary in `bin` directory and to run `./bin/tfweb -c CONFIG_PATH.toml`



## sshtool

`sshtool` allows you to expose a service running on a machine over other networks using ssh tunneling to be exposed over other machines.


### sshtool config

`sshtool` is toml driven, where each section is an element of array `[[sshconnections]]`
note: we are planning to have full compatibility with [tcprouter](https://gihtub.com/threefoldtech/tcprouter) too.

#### Single connection config

```toml
name = "host2_https"
ipaddr = "134.122.109.244"
# port for ssh connection
port = 22
# local port on our machine, where the server runs
localport = 443
# remote port
remoteport = 443
# user
user = "root"
tcprouter_secret = ""
```
- name: connection name
- ipaddr: machine address
- port: ssh port
- localport: local port on the machine where the server runs.
- remote port: remote port

typical use cases is `443 -> 443` for the case of https and `80 -> 80` for http

### running
`sshtool -c sshconnections.toml`

#### Example of production config

```toml
[[sshconnections]]
name = "host2_https"
ipaddr = "134.122.109.244"
# port for ssh connection
port = 22
# local port on our machine, where the server runs
localport = 443
# remote port
remoteport = 443
# user
user = "root"
tcprouter_secret = ""

[[sshconnections]]
name = "host3_https"
ipaddr = "104.248.250.78"
# port for ssh connection
port = 22
# local port on our machine, where the server runs
localport = 443
# remote port
remoteport = 443
# user
user = "root"
tcprouter_secret = ""

[[sshconnections]]
name = "host2_http"
ipaddr = "134.122.109.244"
# port for ssh connection
port = 22
# local port on our machine, where the server runs
localport = 80
# remote port
remoteport = 80
# user
user = "root"
tcprouter_secret = ""

[[sshconnections]]
name = "host3_http"
ipaddr = "104.248.250.78"
# port for ssh connection
port = 22
# local port on our machine, where the server runs
localport = 80
# remote port
remoteport = 80
# user
user = "root"
tcprouter_secret = ""

```
### sshd_config

make sure to `GatewayPorts yes` in `/etc/ssh/sshd_config`.

## Caddy Deployment


Create a config `Caddyfile` and fill in your websites.
```
http://advisors.threefold.me {
    redir {
           if {scheme} is http
           / https://{host}{uri}
    }
}


https://advisors.threefold.me {
    basicauth / user password

    tls info@threefold.io
    proxy / localhost:3000/advisors
}


http://board.threefold.me {
    redir {
        if {scheme} is http
        / https://{host}{uri}
    }
}
https://board.threefold.me {
    basicauth / user password

    tls info@threefold.io
    proxy / localhost:3000/board
}


http://ambassadors.threefold.me {
    redir {
           if {scheme} is http
           / https://{host}{uri}
    }
}


https://ambassadors.threefold.me {
    basicauth / user password
    tls info@threefold.io
    proxy / localhost:3000/ambassadors
}



http://sdk.threefold.io, https://sdk.threefold.io {
       redir {
           if {scheme} is http
           / https://{host}{uri}
        }
        tls info@threefold.io
        proxy / localhost:3000/sdk
}


http://sdk2.threefold.io, https://sdk2.threefold.io {
       redir {
           if {scheme} is http
           / https://{host}{uri}
        }
        tls info@threefold.io
        proxy / localhost:3000/sdk2
}


http://wiki.threefold.io, https://wiki.threefold.io {
       redir {
           if {scheme} is http
           / https://{host}{uri}
        }
        tls info@threefold.io
        proxy /api localhost:3000/
        proxy / localhost:3000/wiki
}


http://wiki2.threefold.io, https://wiki2.threefold.io {
       redir {
           if {scheme} is http
           / https://{host}{uri}
        }
        tls info@threefold.io
        proxy /api localhost:3000/
        proxy / localhost:3000/wiki2
}

http://simulators.threefold.io, https://simulators.threefold.io {
       redir {
           if {scheme} is http
           / https://{host}{uri}
        }
        tls info@threefold.io
        proxy / localhost:3000/
}
```
to run execute `caddy` in the same directory of the `Caddyfile`

NOTE: Make sure that you have 80, 443 connections configured on the sshtool config file to be able to do http, https.


## Caddy development setup

in your hosts file
```
127.0.0.1 sdk.threefold.io
127.0.0.1 sdk3.threefold.io
127.0.0.1 wiki.threefold.io
127.0.0.1 wiki3.threefold.io
127.0.0.1 boardthreefold.me
127.0.0.1 advisors.threefold.me
127.0.0.1 ambassadors.threefold.me
```

and you can use [Caddyfiledev](./Caddyfiledev) by `caddy -conf Caddyfiledev`


## authentication
to protect wiki/websites with 3botconnect, you can define groups and attach these groups to a specific wiki or a website like the following

```
[[group]]
name = "admin"
users = ["ahmedthabet"]


[[wiki]]
name = "sdk"
title = "Grid Manual"
url = "github.com/threefoldfoundation/info_tfgridsdk"
path = ""
autocommit = false
branch = "development"
branchswitch = false
srcdir = "src"
environment = "production"
groups = ["admin"]
auth = true

[[wiki]]
name = "sdk2"
title = "Grid Manual Staging"
url = "github.com/threefoldfoundation/info_tfgridsdk"
path = ""
autocommit = false
branch = "development"
branchswitch = false
srcdir = "src"
environment = "testing"

```


- Here we define a group named `admin` and of users `ahmedthabet`
- We want to limit access to sdk to that admin group, so we need to define `groups = ["admin"]` and set `auth = true`
- in case of failed login attempts you will find the user who tried in `~/ftweb.access`


## Special endpoints

- `/:name/force_update` force updates a wiki to the latest upstream
- `/:name/merge_update` tries to merge upstream to local
- `/:name/github_webhooks` update once push occurs in the default branch
    
    > - To support webhooks, you must add webhooks to your repo. with the same name of the end point **_github_webhooks_**
    > - Must export **_GITHUB_WEBHOOK_SECRET_** to validate the request.


## preparing static binaries
You can build static binaries within alpine crystal container, add required packages and then run the [static binary builder script](https://github.com/crystaluniverse/publishingtools/blob/development/buildstaticbinaries.sh)

### alpine container

```
sudo docker run -it --name crystalalpine -h crystalalpine --privileged -v /opt/crystalalpine:/opt crystallang/crystal:0.35.1-alpine sh

```

`/opt/crystalalpine` is the host directory that has the publishingtools code that you want to share in the container

### build binaries

to be executed from the alpine container
```
#!/bin/sh
## probably should add --release flag too
shards build --static --link-flags "$(pkg-config libxml-2.0 --libs --static)" --link-flags "$(pkg-config libssh2 --libs --static)"


```

- you might need to install libssh2-static package `apk add libssh2-static libssh2 libssh2-dev`

## Team API

We provided team/partners/farmers api implementation to get all information needed, but the user need to configure the source data sites for each API, see the following example:

```
[[data]]
name = "team"
url = "https://github.com/threefoldfoundation/data_team"
path = ""
autocommit = false
branch = "master"
branchswitch = true
srcdir = "team"
environment = "production"

[[data]]
name = "partners"
url = "https://github.com/threefoldfoundation/data_partners"
path = ""
autocommit = false
branch = "master"
branchswitch = true
srcdir = "partners"
environment = "production"

[[data]]
name = "farmers"
url = "https://github.com/threefoldfoundation/data_farmers"
path = ""
autocommit = false
branch = "master"
branchswitch = true
srcdir = "farmers"
environment = "production"
```

Now the following api endpoints can be used and the data itself (e.g. avatars or logos) will be served too:

* `GET /api/members/list`
* `GET /api/partners/list`
* `GET /api/farmers/list`

For logos, it will be served as configured, from the `srcdir`, e.g. for edge cloud logo at farmers data repo:

 `/farmers/Dragon_Edge_Cloud/Black_logo_no_background.png`

Data is cached until it gets updated by going to `/<data site name>/merge_update` or `/<data site name>/force_update` (no need to restart the server), examples:

- `/team/merge_update`: will pull latest version of configured team data site.
- `/partners/merge_update`: will pull latest version of configured partners data site.

