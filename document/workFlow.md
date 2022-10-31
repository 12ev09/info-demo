# 進め方(仮)

以下のフローで開発を行う

## issueの作成
担当する開発部分を記載。今回はざっくりで大丈夫。  

## ブランチの作成
```console
# ブランチの作成
git branch -b issue-{issue_number}
```

## PRの作成~merge
- 変更分をcommitする(今回はcommitメッセージが適当でも構わない)
- 以下でpush
```
git push -u origin {branch_name}
```

- PRにissue番号を貼る。備考が何かあればそれも記載。
- PR作成者以外が変更箇所を確認し、問題なければmergeする

