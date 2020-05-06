module TFWeb
  module Simulator
    SIM_BASE_URL     = "/simulator"
    SIM_DATASITE_URL = "https://github.com/threefoldfoundation/simulator_export"
    SIM_EXPORTS_DIR  = "tfsimulator/export"

    class Options
      include JSON::Serializable

      property hardware_type : String
      property growth : Int64
      property token_price : String
      property unit_price_range : String
    end

    class AvailableOptions
      include JSON::Serializable

      property hardware_types = Set(String).new
      property growths = Set(Int64).new
      property token_prices = Set(String).new
      property unit_price_ranges = Set(Int8).new
    end

    def self.create_simulator_wiki(options : Options)
      hardware_type = options.hardware_type
      growth = options.growth
      token_price = options.token_price
      unit_price_range = options.unit_price_range.to_i

      params = [hardware_type, "#{growth}", "tft_#{token_price}", "price_#{unit_price_range}"]
      name = "sim_" + params.join("_")

      unless WebServer.wikis.has_key?(name)
        sub_path = File.join(SIM_EXPORTS_DIR, params.join("/"))

        wikiobj = Wiki.new
        wikiobj.name = name
        wikiobj.url = TFWeb::Simulator::SIM_DATASITE_URL
        wikiobj.srcdir = sub_path

        begin
          wikiobj.prepare_on_fs
        rescue
          raise "data path cannot be found '#{sub_path}'"
        end

        WebServer.wikis[wikiobj.name] = wikiobj
        WebServer.prepare_wiki(wikiobj)
      end

      name
    end

    def self.list_dirs(path, &block)
      Dir.children(path).each do |sub_path|
        full_path = File.join(path, sub_path)
        if File.directory?(full_path)
          yield sub_path
        end
      end
    end

    def self.get_available_options
      available_options = AvailableOptions.from_json("{}")

      WebServer.datasites.each do |name, site|
        if site.url.downcase.includes?(SIM_DATASITE_URL)
          path = File.join(site.path, SIM_EXPORTS_DIR)
          list_dirs(path) do |hardware_type|
            available_options.hardware_types << hardware_type
            hardware_type_path = File.join(path, hardware_type)
            list_dirs(hardware_type_path) do |growth|
              available_options.growths << growth.to_i64

              token_prices_path = File.join(hardware_type_path, growth)
              list_dirs(token_prices_path) do |token_price|
                available_options.token_prices << token_price.gsub("tft_", "")
                price_ranges_path = File.join(token_prices_path, token_price)
                list_dirs(price_ranges_path) do |unit_price_range|
                  available_options.unit_price_ranges << unit_price_range.gsub("price_", "").to_i8
                end
              end
            end
          end
        end
      end

      available_options
    end

    get "#{SIM_BASE_URL}/" do
      render "src/tfwebserver/views/simulator/index.ecr"
    end

    get "#{SIM_BASE_URL}/static/*filepath" do |env|
      path = env.params.url["filepath"]

      send_file env, File.join("src/tfwebserver/static/simulator/", path)
    end
  end
end
