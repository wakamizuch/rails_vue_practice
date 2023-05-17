class ExamplesController < ApplicationController
  ITEMS_DATA = [
    { text: 'これはRails側のデータです' },
    { text: 'API経由で取得しています' },
    { text: '取得したこれらのデータはstoreに保存します' },
    { text: 'Hello World!' },
    { text: 'Hoge hoge' },
    { text: 'Matcher Inc.' },
  ]
  def index
    render_success examples: ITEMS_DATA
  end

  def create
    puts example_params
    render_success example: { text: example_params[:text] }
  end

  private
  def example_params
    params.require(:example).permit(:text)
  end
end
