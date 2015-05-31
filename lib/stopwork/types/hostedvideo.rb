require 'viddl-rb'

module Stopwork
  module Types
    # Video slide
    # 
    # Slides consist of a single embeded video. Currently YouTube and Vimeo only.
    # Syntax is any valid youtube or vimeo url
    class HostedVideo < Video
      # match any video url
      def self.match? slide
        begin
          !! ViddlRb.get_urls(slide)
        rescue ViddlRb::DownloadError
          return false
        end
      end

      def url
        cached ViddlRb.get_urls(slide).first, slide
      end
    end
  end
end