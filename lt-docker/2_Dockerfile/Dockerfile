# ベースイメージ
FROM python:3.10.12-slim

# メタ情報の追加
LABEL version="1.0"
LABEL description="Hello, Dockerfile!"

# 作業ディレクトリの指定
WORKDIR /usr/src/app

# 必要なパッケージのインストール
COPY requirements.txt . 
RUN pip install --no-cache-dir -r requirements.txt

# ホストマシンの現在のディレクトリからコンテナ内の作業ディレクトリへファイルをコピー
COPY app.py .

# コンテナ起動時に実行するコマンド
CMD ["python", "./app.py"]
