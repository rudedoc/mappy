class MapController < ApplicationController
  def index
    posts = Post.near([40.758867, -73.985045], 0.2)

  end

  def posts
    posts = Post.near([40.758867, -73.985045], 2000)

    render json: { posts: posts }

  end
end
