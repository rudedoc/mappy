class Post < ActiveRecord::Base
  reverse_geocoded_by :latitude, :longitude

  def self.get_posts
    TweetStream.configure do |config|
      config.consumer_key       = ' '
      config.consumer_secret    = ' '
      config.oauth_token        = ' '
      config.oauth_token_secret = ' '
      config.auth_method        = :oauth
    end

    @client = TweetStream::Client.new
    @client.on_error { |e| puts e.inspect }

    @client.track('NYC') { |status|
      tags = status.attrs[:entities][:hashtags].collect { |tag| tag[:text].upcase }
      begin
        if status.geo?
          post = Post.create!(handle: status.user.screen_name, text: status.text, latitude: status.geo.lat, longitude: status.geo.long)
          post.tags = tags
          post.tags_will_change!
          post.save!
        end
      rescue => e
        puts e.inspect
      end
    }
  end
end
