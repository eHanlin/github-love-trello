# github-love-trello
Github ❤️Trello，alpha 版，目前只支援 push 事件

## 使用方法
1. 想辦法部署到你的 lambda 上
2. 設定 lambda 環境變數，配對你的 github 帳號與 trello 金鑰跟權杖 ex:
   ```
   ${github_username}_trello_key
   ${github_username}_trello_token
   ```
3. 設定 github 專案的 webhook，掛到你的 lambda 位置
4. git commit 時，comment 文字裡若包含 trello#card_id 格式的內容就會自動在對應的 trello 卡片上留言了
5. 沒打算弄得更好

