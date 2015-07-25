# use Rack::Static,
#   :urls => Dir.glob("#{root}/*").map { |fn| fn.gsub(/#{root}/, '')},
#   :root => root,
#   :index => 'index.html',
#   :header_rules => [[:all, {'Cache-Control' => 'public, max-age=3600'}]]
# credit: https://github.com/kmikael/vienna

require 'vienna'
run Vienna
