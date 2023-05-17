class ExamplesController < ApplicationController
  ITEMS_DATA = [
    { text: 'これはRails側のデータです' },
    { text: 'APIで取得しています' },
    { text: '取得したこれらのデータはstoreに保存します' },
    { text: 'Hello World!' },
    { text: 'Hoge hoge' },
    { text: 'Here is Matcher Inc.' },
  ]
  def index
    render_success items: ITEMS_DATA
  end

  def create
    puts example_params
    render_success item: { text: example_params[:text] }
  end

  private
  def example_params
    params.require(:example).permit(:text)
  end
end
