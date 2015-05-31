require 'viddl-rb'
require 'nokogiri'
require 'open-uri'

class String
  def to_title
    gsub(/[-_.\s]([a-zA-Z0-9])/) { $1.upcase }.gsub(/([A-Z])/) { " #{$1}"}.gsub(/^([a-z])/) { $1.upcase }
  end
end

class Vine < ViddlRb::PluginBase
  def self.matches_provider?(url)
    url.include?("vine.co")
  end

  # return the url for original video file and title
  def self.get_urls_and_filenames(url, options = {})
    doc = Nokogiri::HTML(open(url))
    url = doc.css("head meta[property='twitter:player:stream']").first.attr("content")
    title = doc.css("head meta[property='twitter:title']").first.attr("content")
    
    [{:url => url, :name => title}]
  end
end