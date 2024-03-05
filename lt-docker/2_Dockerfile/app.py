import numpy as np

# 0 から 9 までの乱数で構成される 10 要素の配列を生成
array = np.random.randint(0, 10, 10)

# 配列の平均値を計算
mean = np.mean(array)

# 結果の出力
print(f"The mean of the array is: {mean}")
