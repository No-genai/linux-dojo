// ===== コマンドデータ =====
const COMMANDS = [
  // ファイル操作
  {
    name: "ls",
    cat: "file",
    short: "ファイル・フォルダの一覧を表示する",
    desc: "現在のディレクトリにあるファイルやフォルダを一覧表示します。最もよく使うコマンドのひとつ。",
    options: [
      { flag: "-l", note: "詳細情報（サイズ・権限・更新日時）を表示" },
      { flag: "-a", note: "隠しファイル（.で始まるもの）も表示" },
      { flag: "-h", note: "ファイルサイズを読みやすい単位（KB/MBなど）で表示" },
      { flag: "-la", note: "-l と -a を同時に指定（よく使う組み合わせ）" },
    ],
    examples: [
      { cmd: "ls", note: "現在のディレクトリを一覧表示" },
      { cmd: "ls -la", note: "隠しファイルも含めて詳細表示" },
      { cmd: "ls /home/user", note: "指定したパスの中身を表示" },
    ],
    tip: "ls -la を略して ll と打てる環境も多い（エイリアスという機能）"
  },
  {
    name: "cp",
    cat: "file",
    short: "ファイルやフォルダをコピーする",
    desc: "ファイルを別の場所にコピーします。フォルダをコピーするときは -r オプションが必要です。",
    options: [
      { flag: "-r", note: "フォルダを中身ごとコピー（recursive の略）" },
      { flag: "-i", note: "上書き前に確認を求める" },
      { flag: "-v", note: "コピーした内容を表示（verbose）" },
    ],
    examples: [
      { cmd: "cp file.txt backup.txt", note: "file.txt を backup.txt という名前でコピー" },
      { cmd: "cp -r myfolder/ newfolder/", note: "フォルダごとコピー" },
      { cmd: "cp *.txt /backup/", note: ".txtファイルをすべて /backup/ にコピー" },
    ],
    tip: "コピー元とコピー先、両方のパスを指定するのを忘れずに！"
  },
  {
    name: "mv",
    cat: "file",
    short: "ファイルを移動 / 名前を変える",
    desc: "ファイルやフォルダを移動します。同じ場所で使えばリネーム（名前変更）になります。",
    options: [
      { flag: "-i", note: "上書き前に確認を求める" },
      { flag: "-v", note: "移動した内容を表示" },
    ],
    examples: [
      { cmd: "mv old.txt new.txt", note: "old.txt を new.txt にリネーム" },
      { cmd: "mv file.txt /documents/", note: "file.txt を /documents/ に移動" },
      { cmd: "mv *.log /logs/", note: ".logファイルをすべて移動" },
    ],
    tip: "mv はゴミ箱なし！削除ではなく移動なので注意。"
  },
  {
    name: "rm",
    cat: "file",
    short: "ファイル・フォルダを削除する",
    desc: "ファイルを削除します。削除したファイルはゴミ箱には入らず、即座に消えます。慎重に使おう。",
    options: [
      { flag: "-r", note: "フォルダを中身ごと削除" },
      { flag: "-i", note: "削除前に確認を求める（安全！）" },
      { flag: "-f", note: "確認なしで強制削除（危険）" },
    ],
    examples: [
      { cmd: "rm file.txt", note: "file.txt を削除" },
      { cmd: "rm -r myfolder/", note: "フォルダを中身ごと削除" },
      { cmd: "rm -i *.tmp", note: ".tmpファイルを1つずつ確認しながら削除" },
    ],
    tip: "⚠ rm -rf / は絶対に実行しないで！ すべてのファイルが消えます。"
  },
  {
    name: "touch",
    cat: "file",
    short: "空のファイルを作成する",
    desc: "空のファイルを作ります。すでにあるファイルに使うと更新日時だけが変わります。",
    options: [],
    examples: [
      { cmd: "touch memo.txt", note: "memo.txt という空ファイルを作成" },
      { cmd: "touch a.txt b.txt c.txt", note: "複数のファイルを一度に作成" },
    ],
    tip: "スクリプトや設定ファイルの雛形を素早く作りたいときに便利！"
  },
  {
    name: "cat",
    cat: "file",
    short: "ファイルの内容を表示する",
    desc: "ファイルの中身をターミナルに出力します。短いファイルの確認に向いています。",
    options: [
      { flag: "-n", note: "行番号を付けて表示" },
    ],
    examples: [
      { cmd: "cat memo.txt", note: "memo.txt の内容を表示" },
      { cmd: "cat -n script.sh", note: "行番号付きで表示" },
      { cmd: "cat a.txt b.txt > c.txt", note: "a.txt と b.txt を結合して c.txt に保存" },
    ],
    tip: "長いファイルは less コマンドを使った方がスクロールできて便利！"
  },
  {
    name: "less",
    cat: "file",
    short: "ファイルをスクロールして読む",
    desc: "ファイルの内容をページ単位でスクロールして読めます。長いログファイルの確認に最適。",
    options: [],
    examples: [
      { cmd: "less log.txt", note: "log.txt をスクロールしながら読む" },
    ],
    tip: "終了するには q キー。/ で文字検索、n で次の一致箇所に移動できる。"
  },
  {
    name: "find",
    cat: "file",
    short: "ファイルを検索する",
    desc: "指定した条件でファイルやフォルダを探します。ファイル名・種類・更新日時など様々な条件で絞り込めます。",
    options: [
      { flag: "-name", note: "ファイル名で検索（* が使える）" },
      { flag: "-type f", note: "ファイルだけを対象にする" },
      { flag: "-type d", note: "ディレクトリだけを対象にする" },
      { flag: "-mtime -7", note: "7日以内に更新されたファイル" },
    ],
    examples: [
      { cmd: 'find . -name "*.txt"', note: "現在地以下の .txt ファイルをすべて検索" },
      { cmd: 'find /home -type f -name "memo*"', note: "/home以下でmemoから始まるファイルを検索" },
    ],
    tip: ". は「現在のディレクトリ」という意味。find はパワフルだが少し遅い。"
  },
  // ディレクトリ
  {
    name: "pwd",
    cat: "dir",
    short: "現在いるディレクトリを表示する",
    desc: "今自分がどのディレクトリにいるかを絶対パス（/から始まるフルパス）で表示します。",
    options: [],
    examples: [
      { cmd: "pwd", note: "/home/user/documents のように表示される" },
    ],
    tip: "迷子になったら pwd。現在地確認の定番コマンド。"
  },
  {
    name: "cd",
    cat: "dir",
    short: "ディレクトリを移動する",
    desc: "指定したディレクトリに移動します。Windowsのエクスプローラーでフォルダをダブルクリックするイメージ。",
    options: [],
    examples: [
      { cmd: "cd documents", note: "documents フォルダに移動" },
      { cmd: "cd ..", note: "ひとつ上のフォルダに戻る" },
      { cmd: "cd ~", note: "ホームディレクトリ（自分のフォルダ）に移動" },
      { cmd: "cd /var/log", note: "絶対パスで移動" },
    ],
    tip: "~ はホームディレクトリの省略形。cd ~ はどこからでも home に戻れる。"
  },
  {
    name: "mkdir",
    cat: "dir",
    short: "新しいディレクトリ（フォルダ）を作る",
    desc: "新しいフォルダを作成します。-p オプションで中間フォルダも一緒に作れます。",
    options: [
      { flag: "-p", note: "途中のフォルダも含めて一気に作成" },
    ],
    examples: [
      { cmd: "mkdir myproject", note: "myproject フォルダを作成" },
      { cmd: "mkdir -p a/b/c", note: "a/b/c の構造をまとめて作成" },
    ],
    tip: "-p がないと、親フォルダが存在しない場合エラーになる。"
  },
  {
    name: "rmdir",
    cat: "dir",
    short: "空のディレクトリを削除する",
    desc: "空のフォルダを削除します。中にファイルがある場合は rm -r を使います。",
    options: [],
    examples: [
      { cmd: "rmdir emptyfolder", note: "空のフォルダを削除" },
    ],
    tip: "中にファイルがあると削除できない。その場合は rm -r を使おう。"
  },
  // テキスト処理
  {
    name: "grep",
    cat: "text",
    short: "ファイルから特定の文字列を検索する",
    desc: "ファイルの中から指定したキーワードが含まれる行を抽出します。ログ検索でよく使います。",
    options: [
      { flag: "-i", note: "大文字小文字を区別しない" },
      { flag: "-r", note: "フォルダ以下を再帰的に検索" },
      { flag: "-n", note: "マッチした行の行番号も表示" },
      { flag: "-v", note: "マッチしない行を表示（除外）" },
      { flag: "-c", note: "マッチした行の数だけ表示" },
    ],
    examples: [
      { cmd: 'grep "error" log.txt', note: "log.txt から error を含む行を表示" },
      { cmd: 'grep -ri "warning" ./logs/', note: "logsフォルダ以下をまとめて検索（大小文字無視）" },
      { cmd: 'cat log.txt | grep "2024"', note: "パイプと組み合わせて使う例" },
    ],
    tip: "| (パイプ) と組み合わせると、他のコマンドの出力を絞り込める。"
  },
  {
    name: "head",
    cat: "text",
    short: "ファイルの先頭を表示する",
    desc: "ファイルの最初の数行を表示します。デフォルトは10行。",
    options: [
      { flag: "-n 5", note: "先頭5行を表示（行数は変更可）" },
    ],
    examples: [
      { cmd: "head log.txt", note: "log.txt の先頭10行を表示" },
      { cmd: "head -n 3 file.txt", note: "先頭3行を表示" },
    ],
    tip: "tail と反対の動きをする。どちらも巨大ファイルを素早く確認するのに便利。"
  },
  {
    name: "tail",
    cat: "text",
    short: "ファイルの末尾を表示する",
    desc: "ファイルの最後の数行を表示します。-f オプションでリアルタイムにログを監視できます。",
    options: [
      { flag: "-n 5", note: "末尾5行を表示" },
      { flag: "-f", note: "ファイルの更新をリアルタイムで追い続ける" },
    ],
    examples: [
      { cmd: "tail log.txt", note: "log.txt の末尾10行を表示" },
      { cmd: "tail -f access.log", note: "アクセスログをリアルタイム監視" },
    ],
    tip: "tail -f はサーバーのログ監視で超よく使う！ Ctrl+C で終了。"
  },
  {
    name: "wc",
    cat: "text",
    short: "行数・単語数・文字数を数える",
    desc: "ファイルの行数、単語数、バイト数を表示します。",
    options: [
      { flag: "-l", note: "行数だけ表示" },
      { flag: "-w", note: "単語数だけ表示" },
      { flag: "-c", note: "バイト数だけ表示" },
    ],
    examples: [
      { cmd: "wc -l file.txt", note: "file.txt の行数を表示" },
      { cmd: 'grep "error" log.txt | wc -l', note: "エラー行が何行あるか数える" },
    ],
    tip: "grep と組み合わせて「条件に一致した行数を数える」用途でよく使う。"
  },
  {
    name: "sort",
    cat: "text",
    short: "テキストを並び替える",
    desc: "ファイルの内容や入力テキストを並び替えます。デフォルトはアルファベット順。",
    options: [
      { flag: "-r", note: "逆順に並び替え" },
      { flag: "-n", note: "数値として並び替え" },
      { flag: "-u", note: "重複行を除いて並び替え" },
    ],
    examples: [
      { cmd: "sort names.txt", note: "names.txt をアルファベット順にソート" },
      { cmd: "sort -rn scores.txt", note: "数値を大きい順に並べる" },
    ],
    tip: "uniq コマンドと組み合わせて重複行を削除するパターンがよく使われる。"
  },
  {
    name: "uniq",
    cat: "text",
    short: "連続した重複行を削除する",
    desc: "隣り合った重複行を削除します。sort と合わせて使うと全重複を消せます。",
    options: [
      { flag: "-c", note: "重複回数を先頭に付けて表示" },
      { flag: "-d", note: "重複している行だけを表示" },
    ],
    examples: [
      { cmd: "sort file.txt | uniq", note: "重複を除いてソート" },
      { cmd: "sort file.txt | uniq -c", note: "各行の出現回数を数える" },
    ],
    tip: "sort してから uniq するのがセット。順番を守ろう！"
  },
  {
    name: "sed",
    cat: "text",
    short: "テキストを置換・編集する",
    desc: "テキストの置換や行の削除など、ストリーム処理ができるコマンドです。",
    options: [
      { flag: "-i", note: "ファイルを直接書き換える（バックアップ注意）" },
      { flag: "-n", note: "デフォルトの出力を抑制する" },
    ],
    examples: [
      { cmd: 'sed "s/old/new/g" file.txt', note: "old を new に全置換して表示" },
      { cmd: 'sed -i "s/foo/bar/g" file.txt', note: "ファイルを直接書き換え" },
      { cmd: 'sed "2d" file.txt', note: "2行目を削除して表示" },
    ],
    tip: "s/置換前/置換後/g の g は「全部置換」の意味。g がないと1行に1回だけ。"
  },
  // システム情報
  {
    name: "ps",
    cat: "system",
    short: "実行中のプロセスを一覧表示",
    desc: "現在動いているプロセス（プログラム）の一覧を表示します。",
    options: [
      { flag: "aux", note: "全ユーザーのプロセスを詳細表示（よく使う）" },
      { flag: "-ef", note: "フル形式で全プロセスを表示" },
    ],
    examples: [
      { cmd: "ps aux", note: "全プロセスを詳細表示" },
      { cmd: 'ps aux | grep nginx', note: "nginx のプロセスだけ検索" },
    ],
    tip: "PID（プロセスID）が確認でき、kill コマンドでプロセスを終了するときに使う。"
  },
  {
    name: "top",
    cat: "system",
    short: "CPU・メモリ使用状況をリアルタイム表示",
    desc: "プロセスごとのCPU・メモリ使用率をリアルタイムで一覧表示します。サーバー監視に使います。",
    options: [],
    examples: [
      { cmd: "top", note: "リアルタイムでプロセス一覧を表示" },
    ],
    tip: "終了は q キー。CPU使用率が高いプロセスが一番上に来る。"
  },
  {
    name: "df",
    cat: "system",
    short: "ディスク使用量を確認する",
    desc: "各ストレージの容量・使用量・空き容量を表示します。",
    options: [
      { flag: "-h", note: "人が読みやすい単位（GB/MBなど）で表示" },
    ],
    examples: [
      { cmd: "df -h", note: "全ディスクの使用状況を読みやすく表示" },
    ],
    tip: "Use% が 80% を超えてきたら要注意。ディスク満杯はサーバーの大敵！"
  },
  {
    name: "du",
    cat: "system",
    short: "ディレクトリのサイズを確認する",
    desc: "フォルダやファイルのサイズを表示します。「どのフォルダが容量食ってるか」を調べるのに便利。",
    options: [
      { flag: "-h", note: "読みやすい単位で表示" },
      { flag: "-s", note: "合計だけ表示" },
      { flag: "--max-depth=1", note: "1階層だけ掘り下げて表示" },
    ],
    examples: [
      { cmd: "du -sh *", note: "現在地のフォルダ・ファイルのサイズ一覧" },
      { cmd: "du -sh /var/log/", note: "ログフォルダの合計サイズ" },
    ],
    tip: "df がディスク全体、du が特定フォルダの調査。使い分けを覚えよう！"
  },
  {
    name: "free",
    cat: "system",
    short: "メモリの使用状況を確認する",
    desc: "RAM（メモリ）の使用量・空き容量を表示します。",
    options: [
      { flag: "-h", note: "読みやすい単位で表示" },
    ],
    examples: [
      { cmd: "free -h", note: "メモリ使用状況を読みやすく表示" },
    ],
    tip: "available の値が実際に使えるメモリ量の目安。"
  },
  {
    name: "uname",
    cat: "system",
    short: "システム・カーネル情報を表示",
    desc: "OSやカーネルのバージョンなどシステム情報を表示します。",
    options: [
      { flag: "-a", note: "すべての情報を表示" },
      { flag: "-r", note: "カーネルバージョンのみ表示" },
    ],
    examples: [
      { cmd: "uname -a", note: "OS情報をすべて表示" },
    ],
    tip: "LinuxかmacOSかなど、環境確認するときに使う。"
  },
  {
    name: "whoami",
    cat: "system",
    short: "現在のユーザー名を表示する",
    desc: "今ログインしているユーザー名を表示します。",
    options: [],
    examples: [
      { cmd: "whoami", note: "現在のユーザー名を表示（例: user, root）" },
    ],
    tip: "root ならスーパーユーザー。なるべく root での作業は避けよう。"
  },
  {
    name: "history",
    cat: "system",
    short: "コマンド履歴を表示する",
    desc: "過去に実行したコマンドの一覧を番号付きで表示します。",
    options: [],
    examples: [
      { cmd: "history", note: "コマンド履歴を一覧表示" },
      { cmd: "history | grep mkdir", note: "過去に使ったmkdirコマンドを探す" },
      { cmd: "!100", note: "履歴番号100のコマンドを再実行" },
    ],
    tip: "↑キーでも1つずつ履歴を遡れる。Ctrl+R で履歴をインクリメンタル検索できる！"
  },
  {
    name: "echo",
    cat: "system",
    short: "テキストを画面に出力する",
    desc: "指定した文字列を出力します。シェルスクリプトやデバッグでよく使います。",
    options: [],
    examples: [
      { cmd: 'echo "Hello World"', note: "Hello World と表示" },
      { cmd: 'echo $HOME', note: "HOME という環境変数の値を表示" },
      { cmd: 'echo "text" >> file.txt', note: "file.txt にテキストを追記" },
    ],
    tip: ">> はファイルに追記。> は上書き。間違えるとファイルが消えるので注意！"
  },
  {
    name: "kill",
    cat: "system",
    short: "プロセスを終了させる",
    desc: "PID（プロセスID）を指定してプロセスを終了させます。ps コマンドでPIDを調べてから使います。",
    options: [
      { flag: "-9", note: "強制終了（SIGKILL）。通常の kill で止まらない場合に使う" },
      { flag: "-15", note: "通常終了（SIGTERM）。デフォルト" },
    ],
    examples: [
      { cmd: "kill 1234", note: "PID 1234 のプロセスを終了" },
      { cmd: "kill -9 1234", note: "PID 1234 を強制終了" },
      { cmd: "pkill nginx", note: "名前で指定して終了（pkillコマンド）" },
    ],
    tip: "ps aux | grep <プロセス名> でPIDを探してから kill するのが基本の流れ。"
  },
  // パーミッション
  {
    name: "chmod",
    cat: "permission",
    short: "ファイルの権限を変更する",
    desc: "ファイルやフォルダの読み取り・書き込み・実行権限を変更します。",
    options: [
      { flag: "+x", note: "実行権限を追加" },
      { flag: "-x", note: "実行権限を削除" },
      { flag: "644", note: "数値で指定: 所有者=読み書き、他=読み取りのみ" },
      { flag: "755", note: "所有者=全権限、他=読み取り+実行" },
    ],
    examples: [
      { cmd: "chmod +x script.sh", note: "スクリプトに実行権限を付ける" },
      { cmd: "chmod 644 file.txt", note: "所有者だけ書き込み可能に" },
      { cmd: "chmod -R 755 myfolder/", note: "フォルダ全体の権限を変更" },
    ],
    tip: "スクリプトを ./script.sh で実行しようとして Permission denied が出たら chmod +x で解決できる！"
  },
  {
    name: "chown",
    cat: "permission",
    short: "ファイルの所有者を変更する",
    desc: "ファイルやフォルダの所有者（ユーザー・グループ）を変更します。管理者権限が必要な場合が多い。",
    options: [
      { flag: "-R", note: "フォルダ以下すべてを対象にする" },
    ],
    examples: [
      { cmd: "chown user file.txt", note: "file.txt の所有者を user に変更" },
      { cmd: "chown user:group file.txt", note: "ユーザーとグループを同時に変更" },
      { cmd: "sudo chown -R www-data /var/www/", note: "Webサーバーのよくある設定例" },
    ],
    tip: "所有者以外のファイルを変更するには sudo が必要。"
  },
  {
    name: "sudo",
    cat: "permission",
    short: "管理者権限でコマンドを実行する",
    desc: "スーパーユーザー（root）の権限でコマンドを実行します。システム設定変更やパッケージインストールに必要。",
    options: [],
    examples: [
      { cmd: "sudo apt update", note: "管理者権限でパッケージリストを更新" },
      { cmd: "sudo -i", note: "rootユーザーのシェルに切り替える" },
      { cmd: "sudo !!", note: "直前のコマンドを sudo で再実行" },
    ],
    tip: "sudo を使いすぎると危険。本当に必要なときだけ使おう。"
  },
  // ネットワーク
  {
    name: "ping",
    cat: "network",
    short: "ネットワークの疎通確認をする",
    desc: "指定したサーバーやIPアドレスに信号を送り、通信できるか確認します。",
    options: [
      { flag: "-c 4", note: "4回だけ実行して終了（macOS/Linux）" },
    ],
    examples: [
      { cmd: "ping google.com", note: "Googleに疎通確認（Ctrl+Cで終了）" },
      { cmd: "ping -c 4 8.8.8.8", note: "Googleの公開DNSに4回だけpingを打つ" },
    ],
    tip: "インターネットに繋がらないとき、まず ping でネットワーク自体を確認しよう。"
  },
  {
    name: "curl",
    cat: "network",
    short: "URLからデータを取得・送信する",
    desc: "URLに対してHTTPリクエストを送ります。APIのテストやファイルのダウンロードに使います。",
    options: [
      { flag: "-o file", note: "出力をファイルに保存" },
      { flag: "-L", note: "リダイレクトに追従する" },
      { flag: "-X POST", note: "POSTリクエストを送る" },
      { flag: "-H", note: "ヘッダーを追加する" },
    ],
    examples: [
      { cmd: "curl https://example.com", note: "WebページのHTMLを取得" },
      { cmd: "curl -o file.zip https://example.com/file.zip", note: "ファイルをダウンロード" },
      { cmd: "curl -X POST -H \"Content-Type: application/json\" -d '{\"key\":\"value\"}' https://api.example.com", note: "JSONをPOST送信" },
    ],
    tip: "APIのデバッグや自動化スクリプトで超よく使う！まず curl でAPIを確認する習慣をつけよう。"
  },
  {
    name: "wget",
    cat: "network",
    short: "ファイルをダウンロードする",
    desc: "指定したURLからファイルをダウンロードします。curl より簡単にファイルを保存できます。",
    options: [
      { flag: "-O name", note: "保存ファイル名を指定" },
      { flag: "-r", note: "サイト全体を再帰的にダウンロード" },
    ],
    examples: [
      { cmd: "wget https://example.com/file.zip", note: "ファイルをダウンロード" },
      { cmd: "wget -O myfile.zip https://example.com/file.zip", note: "ファイル名を指定してダウンロード" },
    ],
    tip: "curl はデータ送受信全般、wget はファイルのダウンロードが得意。"
  },
  {
    name: "ssh",
    cat: "network",
    short: "リモートサーバーに接続する",
    desc: "ネットワーク越しに別のサーバーに安全に接続します。サーバー管理の基本コマンド。",
    options: [
      { flag: "-i key.pem", note: "秘密鍵ファイルを指定" },
      { flag: "-p 2222", note: "ポート番号を指定" },
    ],
    examples: [
      { cmd: "ssh user@192.168.1.1", note: "IPアドレス指定でサーバーに接続" },
      { cmd: "ssh -i ~/.ssh/mykey.pem ubuntu@server.example.com", note: "AWS EC2などでよく使う形式" },
    ],
    tip: "初めて接続するサーバーは yes/no を聞かれる。yes と入力して接続を確立しよう。"
  },
  // パッケージ管理
  {
    name: "apt",
    cat: "package",
    short: "パッケージを管理する（Debian/Ubuntu）",
    desc: "UbuntuなどDebian系Linuxのパッケージ（ソフトウェア）を管理します。インストール・更新・削除ができます。",
    options: [],
    examples: [
      { cmd: "sudo apt update", note: "パッケージリストを最新に更新" },
      { cmd: "sudo apt install nginx", note: "nginx をインストール" },
      { cmd: "sudo apt upgrade", note: "インストール済みパッケージを全更新" },
      { cmd: "sudo apt remove nginx", note: "nginx を削除" },
    ],
    tip: "まず apt update でリスト更新 → apt install でインストール、の順番が基本！"
  },
  {
    name: "yum",
    cat: "package",
    short: "パッケージを管理する（CentOS/RHEL）",
    desc: "CentOSやRHELなどRPM系Linuxのパッケージ管理コマンドです。最近は dnf に置き換わっています。",
    options: [],
    examples: [
      { cmd: "sudo yum install nginx", note: "nginx をインストール" },
      { cmd: "sudo yum update", note: "全パッケージを更新" },
      { cmd: "sudo yum remove nginx", note: "nginx を削除" },
    ],
    tip: "AWSのAmazon Linux 2はyumを使う。Amazon Linux 2023からはdnfに変わった。"
  },
  {
    name: "brew",
    cat: "package",
    short: "macOSのパッケージマネージャー",
    desc: "macOS（とLinux）で使えるパッケージマネージャー。開発ツールのインストールに使います。",
    options: [],
    examples: [
      { cmd: "brew install node", note: "Node.jsをインストール" },
      { cmd: "brew update && brew upgrade", note: "Homebrew自体と全パッケージを更新" },
      { cmd: "brew list", note: "インストール済みパッケージ一覧" },
      { cmd: "brew uninstall node", note: "Node.jsを削除" },
    ],
    tip: "まず brew install でOK。brew search <name> でパッケージを探せる。"
  },
];

// ===== コマンドリスト（補完用） =====
const CMD_NAMES = COMMANDS.map(c => c.name).concat(["clear", "help", "date", "exit"]);

// ===== 状態管理 =====
let currentCat = "all";
let currentCmd = null;
let learnedSet = new Set(JSON.parse(localStorage.getItem("learned") || "[]"));

// ===== 初期化 =====
function init() {
  document.getElementById("total-count").textContent = COMMANDS.length;
  updateLearnedCount();
  renderGrid();
  setupSearch();
  setupCategories();
  setupTerminal();
}

function updateLearnedCount() {
  document.getElementById("learned-count").textContent = learnedSet.size;
}

// ===== グリッド描画 =====
function renderGrid(filter = "") {
  const grid = document.getElementById("commands-grid");
  const filtered = COMMANDS.filter(c =>
    (currentCat === "all" || c.cat === currentCat) &&
    (!filter || c.name.includes(filter) || c.short.includes(filter) || c.desc.includes(filter))
  );

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty-state"><p>「${escapeHtml(filter)}」に一致するコマンドが見つかりませんでした</p></div>`;
    return;
  }

  grid.innerHTML = filtered.map(c => `
    <div class="cmd-card ${currentCmd === c.name ? "selected" : ""} ${learnedSet.has(c.name) ? "learned" : ""}"
         data-name="${c.name}" onclick="showDetail('${c.name}')">
      <div class="cmd-name">${c.name}</div>
      <div class="cmd-desc-short">${c.short}</div>
      <span class="learned-badge">✓</span>
    </div>
  `).join("");
}

// ===== カテゴリ切替 =====
function setupCategories() {
  document.querySelectorAll("#category-list li").forEach(li => {
    li.addEventListener("click", () => {
      document.querySelectorAll("#category-list li").forEach(x => x.classList.remove("active"));
      li.classList.add("active");
      currentCat = li.dataset.cat;
      renderGrid(document.getElementById("search").value);
    });
  });
}

// ===== 検索 =====
function setupSearch() {
  document.getElementById("search").addEventListener("input", e => {
    renderGrid(e.target.value);
  });
}

// ===== 詳細パネル =====
function showDetail(name) {
  currentCmd = name;
  const c = COMMANDS.find(x => x.name === name);
  if (!c) return;
  renderGrid(document.getElementById("search").value);

  const isLearned = learnedSet.has(name);
  const catLabel = {
    file: "ファイル操作", dir: "ディレクトリ", text: "テキスト処理",
    system: "システム情報", permission: "パーミッション", network: "ネットワーク", package: "パッケージ管理"
  }[c.cat];

  document.getElementById("detail-panel").innerHTML = `
    <div class="detail-content">
      <h2>${c.name}</h2>
      <div class="detail-cat">${catLabel}</div>
      <p class="detail-desc">${c.desc}</p>

      ${c.options.length > 0 ? `
        <div class="detail-section-title">よく使うオプション</div>
        <ul class="options-list">
          ${c.options.map(o => `
            <li><span class="option-flag">${o.flag}</span><span class="option-note">${o.note}</span></li>
          `).join("")}
        </ul>
      ` : ""}

      <div class="detail-section-title">使用例</div>
      <ul class="examples-list">
        ${c.examples.map(e => `
          <li class="example-item" onclick="pasteToTerminal('${escapeAttr(e.cmd)}')" title="クリックしてターミナルに貼り付け" style="cursor:pointer">
            <div class="example-cmd">$ ${escapeHtml(e.cmd)}</div>
            <div class="example-note">${e.note} <span style="color:#444;font-size:10px">▶ クリックで試す</span></div>
          </li>
        `).join("")}
      </ul>

      ${c.tip ? `<div class="tip-box">💡 ${c.tip}</div>` : ""}

      <button class="btn-learned ${isLearned ? "done" : ""}" onclick="toggleLearned('${name}')">
        ${isLearned ? "✓ 習得済み" : "習得マークを付ける"}
      </button>
    </div>
  `;
}

function toggleLearned(name) {
  if (learnedSet.has(name)) {
    learnedSet.delete(name);
  } else {
    learnedSet.add(name);
  }
  localStorage.setItem("learned", JSON.stringify([...learnedSet]));
  updateLearnedCount();
  showDetail(name);
  renderGrid(document.getElementById("search").value);
}

// 詳細パネルの使用例クリックでターミナルに貼り付け
function pasteToTerminal(cmd) {
  const input = document.getElementById("terminal-input");
  input.value = cmd;
  input.focus();
  // ターミナルまでスクロール
  document.getElementById("terminal-wrap").scrollIntoView({ behavior: "smooth", block: "end" });
}

// ===== ターミナルフルスクリーン =====
function toggleFullTerm() {
  const wrap = document.getElementById("terminal-wrap");
  wrap.classList.toggle("fullscreen");
  const btn = wrap.querySelector(".btn-fullterm");
  btn.textContent = wrap.classList.contains("fullscreen") ? "✕" : "⛶";
  if (wrap.classList.contains("fullscreen")) {
    document.getElementById("terminal-input").focus();
  }
}

// ===== ターミナルシミュレーター =====
let termHistory = [];
let termHistIdx = -1;

// 仮想ファイルシステム
let vfs = {
  type: "dir",
  children: {
    "documents": { type: "dir", children: {
      "memo.txt": { type: "file", content: "これはメモファイルです。\nLinuxを学習中！\n進捗: ls, cd, cat を覚えた\n" },
      "report.txt": { type: "file", content: "月次レポート\n---\n売上: 100万円\nコスト: 60万円\n利益: 40万円\n" },
      "error.log": { type: "file", content: "[2024-01-01] INFO: サーバー起動\n[2024-01-01] ERROR: 接続タイムアウト\n[2024-01-02] INFO: リクエスト受信\n[2024-01-02] ERROR: データベースエラー\n[2024-01-03] INFO: 正常稼働中\n" },
    }},
    "downloads": { type: "dir", children: {
      "archive.zip": { type: "file", content: "[バイナリファイル]" },
      "image.png": { type: "file", content: "[画像ファイル]" },
    }},
    "scripts": { type: "dir", children: {
      "hello.sh": { type: "file", content: '#!/bin/bash\necho "Hello, World!"\n' },
      "backup.sh": { type: "file", content: '#!/bin/bash\ncp -r ~/documents ~/backup_$(date +%Y%m%d)\necho "バックアップ完了"\n' },
    }},
    "readme.txt": { type: "file", content: "ようこそ Linux コマンド道場へ！\n\n練習用ファイル:\n  documents/memo.txt\n  documents/report.txt\n  documents/error.log\n  scripts/hello.sh\n\nまず 'ls' か 'help' を打ってみよう。\n" },
  }
};

let cwd = [];  // [] = home (~)

function getNode(pathParts) {
  let node = vfs;
  for (const p of pathParts) {
    if (!node.children || !node.children[p]) return null;
    node = node.children[p];
  }
  return node;
}

function cwdDisplay() {
  if (cwd.length === 0) return "~";
  return "~/" + cwd.join("/");
}

function updatePrompt() {
  document.getElementById("t-prompt").textContent = `user@linux:${cwdDisplay()}$ `;
}

function resolvePath(arg) {
  if (!arg || arg === "~") return [];
  if (arg === ".") return [...cwd];
  if (arg === "..") return cwd.length > 0 ? cwd.slice(0, -1) : [];
  if (arg.startsWith("~/")) {
    return arg.slice(2).split("/").filter(Boolean);
  }
  if (arg.startsWith("/")) {
    // 絶対パスをhome相対に変換（練習環境なので~を/として扱う）
    return arg.slice(1).split("/").filter(Boolean);
  }
  return [...cwd, ...arg.split("/").filter(Boolean)];
}

function setupTerminal() {
  const input = document.getElementById("terminal-input");

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const raw = input.value;
      input.value = "";
      if (raw.trim()) {
        termHistory.unshift(raw.trim());
        termHistIdx = -1;
        runCommand(raw.trim());
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (termHistIdx < termHistory.length - 1) termHistIdx++;
      input.value = termHistory[termHistIdx] || "";
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (termHistIdx > 0) { termHistIdx--; input.value = termHistory[termHistIdx] || ""; }
      else { termHistIdx = -1; input.value = ""; }
    } else if (e.key === "Tab") {
      e.preventDefault();
      tabComplete(input);
    }
  });

  // ターミナル内をクリックしたらinputにフォーカス
  document.getElementById("terminal-output").addEventListener("click", () => input.focus());
}

// Tab補完
function tabComplete(input) {
  const val = input.value;
  const parts = val.split(/\s+/);

  if (parts.length === 1) {
    // コマンド補完
    const matches = CMD_NAMES.filter(n => n.startsWith(parts[0]));
    if (matches.length === 1) {
      input.value = matches[0] + " ";
    } else if (matches.length > 1) {
      addTerminalLine(`<span class="tab-suggest">${matches.join("  ")}</span>`);
    }
  } else {
    // ファイル/ディレクトリ補完
    const partial = parts[parts.length - 1];
    const node = getNode(cwd);
    if (node && node.children) {
      const matches = Object.keys(node.children).filter(n => n.startsWith(partial));
      if (matches.length === 1) {
        parts[parts.length - 1] = matches[0];
        input.value = parts.join(" ");
        if (node.children[matches[0]].type === "dir") input.value += "/";
      } else if (matches.length > 1) {
        addTerminalLine(`<span class="tab-suggest">${matches.join("  ")}</span>`);
      }
    }
  }
}

function addTerminalLine(html) {
  const out = document.getElementById("terminal-output");
  const div = document.createElement("div");
  div.className = "t-line";
  div.innerHTML = html;
  out.appendChild(div);
  out.scrollTop = out.scrollHeight;
}

// パイプ処理（簡易版）
function runCommand(raw) {
  const displayCwd = cwdDisplay();
  addTerminalLine(`<span class="t-prompt-line">user@linux:${displayCwd}$ ${escapeHtml(raw)}</span>`);

  // パイプ分割
  const pipes = raw.split("|").map(s => s.trim());
  if (pipes.length > 1) {
    runPipe(pipes);
    return;
  }

  execSingle(raw, null);
}

function runPipe(pipes) {
  // 最初のコマンドを実行して出力をキャプチャ
  let output = captureOutput(pipes[0]);
  if (output === null) return; // エラー済み

  // 残りのコマンドにパイプで渡す
  for (let i = 1; i < pipes.length; i++) {
    output = applyPipeFilter(pipes[i], output);
    if (output === null) return;
  }

  if (output) addTerminalLine(`<span class="t-output">${escapeHtml(output)}</span>`);
}

// コマンドの出力をテキストとしてキャプチャ
function captureOutput(raw) {
  const parts = raw.trim().split(/\s+/);
  const cmd = parts[0];
  const args = parts.slice(1);

  switch (cmd) {
    case "ls": return captureLS(args);
    case "cat": return captureCAT(args[0]);
    case "history": return termHistory.slice().reverse().map((c, i) => `  ${String(i+1).padStart(3)}  ${c}`).join("\n");
    case "ps": return "  PID TTY          TIME CMD\n  1   pts/0    00:00:00 bash\n  42  pts/0    00:00:00 ps";
    case "echo": return args.join(" ").replace(/\$HOME/g, "/home/user").replace(/\$USER/g, "user");
    default:
      addTerminalLine(`<span class="t-error">bash: ${escapeHtml(cmd)}: command not found</span>`);
      return null;
  }
}

function captureLS(args) {
  const pathArg = args.find(a => !a.startsWith("-"));
  const target = resolvePath(pathArg || null);
  const node = getNode(target);
  if (!node || node.type !== "dir") return "";
  return Object.entries(node.children).map(([n, v]) => v.type === "dir" ? n + "/" : n).join("\n");
}

function captureCAT(file) {
  if (!file) return "";
  const node = getNode(resolvePath(file));
  if (!node || node.type === "dir") return "";
  return node.content || "";
}

// パイプフィルタ適用
function applyPipeFilter(cmdStr, input) {
  const parts = cmdStr.trim().split(/\s+/);
  const cmd = parts[0];
  const args = parts.slice(1);
  const lines = input.split("\n");

  switch (cmd) {
    case "grep": {
      const ignoreCase = args.includes("-i");
      const pattern = args.find(a => !a.startsWith("-")) || "";
      const matched = lines.filter(l => ignoreCase ? l.toLowerCase().includes(pattern.toLowerCase()) : l.includes(pattern));
      return matched.join("\n");
    }
    case "wc": {
      if (args.includes("-l")) return String(lines.filter(l => l.length > 0).length);
      return `${lines.length} ${input.trim().split(/\s+/).length} ${input.length}`;
    }
    case "sort": {
      const sorted = [...lines].sort();
      return args.includes("-r") ? sorted.reverse().join("\n") : sorted.join("\n");
    }
    case "uniq": {
      const unique = lines.filter((l, i) => l !== lines[i - 1]);
      if (args.includes("-c")) {
        const counts = [];
        let count = 1;
        for (let i = 1; i <= lines.length; i++) {
          if (lines[i] === lines[i - 1]) { count++; }
          else { counts.push(`${String(count).padStart(4)} ${lines[i - 1]}`); count = 1; }
        }
        return counts.join("\n");
      }
      return unique.join("\n");
    }
    case "head": {
      const n = args.includes("-n") ? parseInt(args[args.indexOf("-n") + 1]) || 10 : 10;
      return lines.slice(0, n).join("\n");
    }
    case "tail": {
      const n = args.includes("-n") ? parseInt(args[args.indexOf("-n") + 1]) || 10 : 10;
      return lines.slice(-n).join("\n");
    }
    default:
      addTerminalLine(`<span class="t-error">bash: ${escapeHtml(cmd)}: command not found</span>`);
      return null;
  }
}

// 単体コマンド実行
function execSingle(raw, _pipeInput) {
  const parts = raw.trim().split(/\s+/);
  const cmd = parts[0];
  const args = parts.slice(1);

  switch (cmd) {
    case "help": doHelp(); break;
    case "ls": doLs(args); break;
    case "pwd": addTerminalLine(`<span class="t-output">${escapeHtml(cwdDisplay().replace("~", "/home/user"))}</span>`); break;
    case "cd": doCd(args[0]); updatePrompt(); break;
    case "cat": doCat(args); break;
    case "mkdir": doMkdir(args); break;
    case "rmdir": doRmdir(args[0]); break;
    case "touch": doTouch(args); break;
    case "rm": doRm(args); break;
    case "cp": doCp(args); break;
    case "mv": doMv(args); break;
    case "echo": {
      const text = args.join(" ").replace(/\$HOME/g, "/home/user").replace(/\$USER/g, "user").replace(/\$PWD/g, cwdDisplay());
      // リダイレクト処理
      const appendIdx = raw.indexOf(">>");
      const writeIdx = raw.indexOf(">");
      if (appendIdx !== -1) {
        const fname = raw.slice(appendIdx + 2).trim();
        const fnode = getNode([...cwd, fname]);
        const cwdNode = getNode(cwd);
        if (cwdNode && cwdNode.children) {
          if (!cwdNode.children[fname]) cwdNode.children[fname] = { type: "file", content: "" };
          cwdNode.children[fname].content += text + "\n";
          addTerminalLine(`<span class="t-success">'${escapeHtml(fname)}' に追記しました</span>`);
        }
      } else if (writeIdx !== -1 && raw[writeIdx + 1] !== ">") {
        const fname = raw.slice(writeIdx + 1).trim();
        const cwdNode = getNode(cwd);
        if (cwdNode && cwdNode.children) {
          cwdNode.children[fname] = { type: "file", content: text + "\n" };
          addTerminalLine(`<span class="t-success">'${escapeHtml(fname)}' に書き込みました</span>`);
        }
      } else {
        addTerminalLine(`<span class="t-output">${escapeHtml(text)}</span>`);
      }
      break;
    }
    case "whoami": addTerminalLine('<span class="t-output">user</span>'); break;
    case "date": addTerminalLine(`<span class="t-output">${new Date().toString()}</span>`); break;
    case "uname":
      if (args.includes("-a")) addTerminalLine('<span class="t-output">Linux linux-dojo 5.15.0-91-generic #101-Ubuntu SMP x86_64 GNU/Linux</span>');
      else addTerminalLine('<span class="t-output">Linux</span>');
      break;
    case "hostname": addTerminalLine('<span class="t-output">linux-dojo</span>'); break;
    case "clear": document.getElementById("terminal-output").innerHTML = ""; break;
    case "history": doHistory(); break;
    case "grep": doGrepSingle(args); break;
    case "wc": doWcSingle(args); break;
    case "head": doHeadSingle(args); break;
    case "tail": doTailSingle(args); break;
    case "find": doFind(args); break;
    case "sort": doSortSingle(args); break;
    case "ps":
      addTerminalLine('<span class="t-output">  PID TTY          TIME CMD\n  1   pts/0    00:00:00 bash\n  2   pts/0    00:00:00 ps</span>');
      break;
    case "top":
      addTerminalLine(`<span class="t-output">top - ${new Date().toLocaleTimeString()} up 1 day, 3:42, 1 user
Tasks: 128 total,   1 running, 127 sleeping
%Cpu(s):  2.1 us,  0.5 sy,  0.0 ni, 97.2 id
MiB Mem:   8192.0 total,   4096.0 free,   2048.0 used
MiB Swap:  2048.0 total,   2048.0 free,      0.0 used

  PID USER  PR  NI  VIRT  RES %CPU %MEM COMMAND
  892 user  20   0  512M  64M  1.2  0.8 node
  100 user  20   0  256M  32M  0.5  0.4 bash
  128 user  20   0  128M  16M  0.1  0.2 ps
<span class="t-hint">（実際の top はリアルタイム表示。q で終了）</span></span>`);
      break;
    case "free":
      addTerminalLine('<span class="t-output">              total        used        free      shared  buff/cache   available\nMem:        8388608     2621440     4194304      131072     1572864     5505024\nSwap:       2097152           0     2097152</span>');
      break;
    case "df":
      addTerminalLine('<span class="t-output">Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        50G   12G   38G  24% /\ntmpfs           4.0G     0  4.0G   0% /dev/shm\n/dev/sda2       100G   45G   55G  45% /home</span>');
      break;
    case "du":
      if (args.includes("-sh")) {
        addTerminalLine('<span class="t-output">4.0K\tdocuments\n4.0K\tdownloads\n4.0K\tscripts\n1.0K\treadme.txt</span>');
      } else {
        addTerminalLine('<span class="t-output">4\t./documents\n4\t./downloads\n4\t./scripts\n16\t.</span>');
      }
      break;
    case "kill":
      if (!args[0]) { addTerminalLine('<span class="t-error">kill: PIDを指定してください</span>'); }
      else addTerminalLine(`<span class="t-success">PID ${escapeHtml(args[args.length - 1])} に終了シグナルを送りました</span>`);
      break;
    case "ping": doPing(args); break;
    case "curl": doCurl(args); break;
    case "wget": doWget(args); break;
    case "ssh":
      addTerminalLine(`<span class="t-system">ssh: ${escapeHtml(args[0] || "ホスト")} に接続中...\n（練習環境のため実際の接続はできません）</span>`);
      break;
    case "sudo":
      addTerminalLine(`<span class="t-system">[sudo] password for user:\n管理者権限でコマンドを実行します（練習環境）</span>`);
      if (args.length > 0) {
        const subcmd = args.join(" ");
        addTerminalLine(`<span class="t-success">実行: ${escapeHtml(subcmd)}</span>`);
      }
      break;
    case "chmod":
      if (args.length < 2) { addTerminalLine('<span class="t-error">使い方: chmod <権限> <ファイル名></span>'); }
      else addTerminalLine(`<span class="t-success">'${escapeHtml(args[args.length - 1])}' の権限を ${escapeHtml(args[0])} に変更しました</span>`);
      break;
    case "chown":
      if (args.length < 2) { addTerminalLine('<span class="t-error">使い方: chown <ユーザー> <ファイル名></span>'); }
      else addTerminalLine(`<span class="t-success">'${escapeHtml(args[args.length - 1])}' の所有者を ${escapeHtml(args[0])} に変更しました</span>`);
      break;
    case "man":
      if (!args[0]) { addTerminalLine('<span class="t-error">man: コマンド名を指定してください</span>'); }
      else {
        const c = COMMANDS.find(x => x.name === args[0]);
        if (c) addTerminalLine(`<span class="t-output">NAME\n    ${c.name} - ${c.short}\n\nDESCRIPTION\n    ${c.desc}\n\n<span class="t-hint">詳細はサイト上のコマンドカードを確認してね</span></span>`);
        else addTerminalLine(`<span class="t-error">man: ${escapeHtml(args[0])}: No manual entry</span>`);
      }
      break;
    case "which":
      if (!args[0]) { addTerminalLine('<span class="t-error">which: コマンド名を指定してください</span>'); }
      else {
        const binPath = { ls: "/bin/ls", cd: "/usr/bin/cd", grep: "/bin/grep", cat: "/bin/cat", find: "/usr/bin/find" };
        addTerminalLine(`<span class="t-output">${binPath[args[0]] || "/usr/bin/" + args[0]}</span>`);
      }
      break;
    case "alias":
      addTerminalLine('<span class="t-output">alias ll=\'ls -la\'\nalias la=\'ls -la\'\nalias grep=\'grep --color=auto\'</span>');
      break;
    case "env":
    case "printenv":
      addTerminalLine('<span class="t-output">HOME=/home/user\nUSER=user\nPATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\nSHELL=/bin/bash\nLANG=ja_JP.UTF-8\nTERM=xterm-256color</span>');
      break;
    case "exit":
      addTerminalLine('<span class="t-system">セッション終了（練習環境）</span>');
      break;
    case "":
      break;
    default:
      addTerminalLine(`<span class="t-error">bash: ${escapeHtml(cmd)}: command not found</span><br><span class="t-hint">  ヒント: <code>help</code> でコマンド一覧 / <code>man ${escapeHtml(cmd)}</code> でマニュアル確認</span>`);
  }
}

// ===== 個別コマンド実装 =====

function doHelp() {
  addTerminalLine(`<span class="t-output">── 使えるコマンド ────────────────────────
<span class="t-success">ファイル操作</span>  ls, cat, cp, mv, rm, touch, find, head, tail, less, man
<span class="t-success">ディレクトリ</span>  pwd, cd, mkdir, rmdir
<span class="t-success">テキスト処理</span>  grep, wc, sort, uniq, sed（パイプ | が使えます）
<span class="t-success">システム情報</span>  whoami, hostname, date, uname, ps, top, free, df, du
               history, echo, env, alias, kill, which
<span class="t-success">ネットワーク</span>  ping, curl, wget, ssh
<span class="t-success">権限管理</span>     chmod, chown, sudo
<span class="t-success">その他</span>       clear, help, exit

── ショートカット ───────────────────────
  Tab     コマンド・ファイル名を補完
  ↑↓      コマンド履歴を移動
  Ctrl+C  コマンド中断（このシミュレーターでは効果なし）

── パイプ（｜）の例 ───────────────────
  cat documents/error.log | grep "ERROR"
  ls | sort
  cat documents/memo.txt | wc -l

── ファイル構造 ─────────────────────────
  ~/readme.txt
  ~/documents/memo.txt
  ~/documents/report.txt
  ~/documents/error.log
  ~/scripts/hello.sh
  ~/scripts/backup.sh
  ~/downloads/archive.zip</span>`);
}

function doLs(args) {
  const showHidden = args.some(a => a.match(/^-[a-z]*a/));
  const longFmt    = args.some(a => a.match(/^-[a-z]*l/));
  const pathArg    = args.find(a => !a.startsWith("-"));
  const target     = resolvePath(pathArg || null);
  const node       = getNode(target);

  if (!node) { addTerminalLine(`<span class="t-error">ls: ${escapeHtml(pathArg)}: No such file or directory</span>`); return; }
  if (node.type !== "dir") { addTerminalLine(`<span class="t-output">${escapeHtml(pathArg)}</span>`); return; }

  let entries = Object.entries(node.children);
  if (!showHidden) entries = entries.filter(([n]) => !n.startsWith("."));

  if (longFmt) {
    const header = showHidden ? `drwxr-xr-x 1 user user  4096 Jun 22 12:00 <span class="t-dir">.</span>\ndrwxr-xr-x 1 user user  4096 Jun 22 12:00 <span class="t-dir">..</span>\n` : "";
    const rows = entries.map(([n, v]) => {
      const isDir = v.type === "dir";
      const perm  = isDir ? "drwxr-xr-x" : (n.endsWith(".sh") ? "-rwxr-xr-x" : "-rw-r--r--");
      const size  = isDir ? "  4096" : String((v.content || "").length).padStart(6);
      const name  = isDir ? `<span class="t-dir">${n}/</span>` : (n.endsWith(".sh") ? `<span class="t-exe">${n}</span>` : n);
      return `${perm} 1 user user ${size} Jun 22 12:00 ${name}`;
    }).join("\n");
    addTerminalLine(`<span class="t-output">${header}${rows}</span>`);
  } else {
    const names = entries.map(([n, v]) =>
      v.type === "dir" ? `<span class="t-dir">${n}</span>` : (n.endsWith(".sh") ? `<span class="t-exe">${n}</span>` : n)
    );
    addTerminalLine(`<span class="t-output">${names.join("  ")}</span>`);
  }
}

function doCd(arg) {
  if (!arg || arg === "~") { cwd = []; return; }
  if (arg === "..") { if (cwd.length > 0) cwd = cwd.slice(0, -1); return; }
  const target = resolvePath(arg);
  const node = getNode(target);
  if (!node) { addTerminalLine(`<span class="t-error">bash: cd: ${escapeHtml(arg)}: No such file or directory</span>`); return; }
  if (node.type !== "dir") { addTerminalLine(`<span class="t-error">bash: cd: ${escapeHtml(arg)}: Not a directory</span>`); return; }
  cwd = target;
}

function doCat(args) {
  const showNum = args.includes("-n");
  const files = args.filter(a => !a.startsWith("-"));
  if (!files.length) { addTerminalLine('<span class="t-error">使い方: cat [-n] <ファイル名></span>'); return; }
  for (const file of files) {
    const node = getNode(resolvePath(file));
    if (!node) { addTerminalLine(`<span class="t-error">cat: ${escapeHtml(file)}: No such file or directory</span>`); continue; }
    if (node.type === "dir") { addTerminalLine(`<span class="t-error">cat: ${escapeHtml(file)}: Is a directory</span>`); continue; }
    let content = node.content || "";
    if (showNum) {
      content = content.split("\n").map((l, i) => `${String(i + 1).padStart(6)}\t${l}`).join("\n");
    }
    addTerminalLine(`<span class="t-output">${escapeHtml(content)}</span>`);
  }
}

function doMkdir(args) {
  const files = args.filter(a => !a.startsWith("-"));
  if (!files.length) { addTerminalLine('<span class="t-error">使い方: mkdir <ディレクトリ名></span>'); return; }
  const node = getNode(cwd);
  if (!node || !node.children) return;
  for (const f of files) {
    if (node.children[f]) { addTerminalLine(`<span class="t-error">mkdir: ${escapeHtml(f)}: File exists</span>`); continue; }
    node.children[f] = { type: "dir", children: {} };
    addTerminalLine(`<span class="t-success">ディレクトリ '${escapeHtml(f)}' を作成しました</span>`);
  }
}

function doRmdir(arg) {
  if (!arg) { addTerminalLine('<span class="t-error">使い方: rmdir <ディレクトリ名></span>'); return; }
  const node = getNode(cwd);
  if (!node || !node.children) return;
  const target = node.children[arg];
  if (!target) { addTerminalLine(`<span class="t-error">rmdir: ${escapeHtml(arg)}: No such file or directory</span>`); return; }
  if (target.type !== "dir") { addTerminalLine(`<span class="t-error">rmdir: ${escapeHtml(arg)}: Not a directory</span>`); return; }
  if (Object.keys(target.children).length > 0) { addTerminalLine(`<span class="t-error">rmdir: ${escapeHtml(arg)}: Directory not empty</span>`); return; }
  delete node.children[arg];
  addTerminalLine(`<span class="t-success">ディレクトリ '${escapeHtml(arg)}' を削除しました</span>`);
}

function doTouch(args) {
  const files = args.filter(a => !a.startsWith("-"));
  if (!files.length) { addTerminalLine('<span class="t-error">使い方: touch <ファイル名></span>'); return; }
  const node = getNode(cwd);
  if (!node || !node.children) return;
  for (const f of files) {
    if (node.children[f]) { /* タイムスタンプ更新のみ（何もしない） */ }
    else { node.children[f] = { type: "file", content: "" }; }
    addTerminalLine(`<span class="t-success">'${escapeHtml(f)}' を作成/更新しました</span>`);
  }
}

function doRm(args) {
  const recursive = args.includes("-r") || args.includes("-rf");
  const force = args.includes("-f") || args.includes("-rf");
  const files = args.filter(a => !a.startsWith("-"));
  if (!files.length) { addTerminalLine('<span class="t-error">使い方: rm [-r] <ファイル名></span>'); return; }
  const node = getNode(cwd);
  if (!node || !node.children) return;
  for (const f of files) {
    if (!node.children[f]) {
      if (!force) addTerminalLine(`<span class="t-error">rm: ${escapeHtml(f)}: No such file or directory</span>`);
      continue;
    }
    if (node.children[f].type === "dir" && !recursive) {
      addTerminalLine(`<span class="t-error">rm: ${escapeHtml(f)}: is a directory（フォルダを削除するには -r が必要）</span>`); continue;
    }
    delete node.children[f];
    addTerminalLine(`<span class="t-success">'${escapeHtml(f)}' を削除しました</span>`);
  }
}

function doCp(args) {
  const files = args.filter(a => !a.startsWith("-"));
  if (files.length < 2) { addTerminalLine('<span class="t-error">使い方: cp <元ファイル> <コピー先></span>'); return; }
  const [src, dst] = files;
  const srcNode = getNode(resolvePath(src));
  if (!srcNode) { addTerminalLine(`<span class="t-error">cp: ${escapeHtml(src)}: No such file or directory</span>`); return; }
  const cwdNode = getNode(cwd);
  if (cwdNode && cwdNode.children) {
    cwdNode.children[dst] = JSON.parse(JSON.stringify(srcNode));
    addTerminalLine(`<span class="t-success">'${escapeHtml(src)}' → '${escapeHtml(dst)}' にコピーしました</span>`);
  }
}

function doMv(args) {
  const files = args.filter(a => !a.startsWith("-"));
  if (files.length < 2) { addTerminalLine('<span class="t-error">使い方: mv <元ファイル> <移動先></span>'); return; }
  const [src, dst] = files;
  const cwdNode = getNode(cwd);
  if (!cwdNode || !cwdNode.children || !cwdNode.children[src]) {
    addTerminalLine(`<span class="t-error">mv: ${escapeHtml(src)}: No such file or directory</span>`); return;
  }
  cwdNode.children[dst] = cwdNode.children[src];
  delete cwdNode.children[src];
  addTerminalLine(`<span class="t-success">'${escapeHtml(src)}' → '${escapeHtml(dst)}' に移動/リネームしました</span>`);
}

function doHistory() {
  if (!termHistory.length) { addTerminalLine('<span class="t-output">（履歴なし）</span>'); return; }
  const lines = [...termHistory].reverse().map((c, i) => `  ${String(i + 1).padStart(3)}  ${c}`).join("\n");
  addTerminalLine(`<span class="t-output">${escapeHtml(lines)}</span>`);
}

function doGrepSingle(args) {
  const pattern = args.find(a => !a.startsWith("-") && !a.includes("."));
  const files = args.filter(a => !a.startsWith("-") && a !== pattern);
  if (!pattern) { addTerminalLine('<span class="t-error">使い方: grep "パターン" ファイル名</span>'); return; }
  if (!files.length) { addTerminalLine('<span class="t-error">ファイルを指定してください</span>'); return; }
  for (const file of files) {
    const node = getNode(resolvePath(file));
    if (!node) { addTerminalLine(`<span class="t-error">grep: ${escapeHtml(file)}: No such file or directory</span>`); continue; }
    const pat = pattern.replace(/^["']|["']$/g, "");
    const ignoreCase = args.includes("-i");
    const showNum = args.includes("-n");
    const lines = (node.content || "").split("\n");
    const matched = lines.reduce((acc, l, i) => {
      const match = ignoreCase ? l.toLowerCase().includes(pat.toLowerCase()) : l.includes(pat);
      if (match) acc.push(showNum ? `${i + 1}: ${l}` : l);
      return acc;
    }, []);
    if (matched.length) addTerminalLine(`<span class="t-output">${escapeHtml(matched.join("\n"))}</span>`);
  }
}

function doWcSingle(args) {
  const file = args.find(a => !a.startsWith("-"));
  if (!file) { addTerminalLine('<span class="t-error">使い方: wc [-l|-w|-c] ファイル名</span>'); return; }
  const node = getNode(resolvePath(file));
  if (!node) { addTerminalLine(`<span class="t-error">wc: ${escapeHtml(file)}: No such file or directory</span>`); return; }
  const content = node.content || "";
  const lines = content.split("\n").length - 1;
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const bytes = content.length;
  if (args.includes("-l")) addTerminalLine(`<span class="t-output">${lines} ${escapeHtml(file)}</span>`);
  else if (args.includes("-w")) addTerminalLine(`<span class="t-output">${words} ${escapeHtml(file)}</span>`);
  else if (args.includes("-c")) addTerminalLine(`<span class="t-output">${bytes} ${escapeHtml(file)}</span>`);
  else addTerminalLine(`<span class="t-output">${String(lines).padStart(4)} ${String(words).padStart(4)} ${String(bytes).padStart(4)} ${escapeHtml(file)}</span>`);
}

function doHeadSingle(args) {
  const nIdx = args.indexOf("-n");
  const n = nIdx !== -1 ? parseInt(args[nIdx + 1]) || 10 : 10;
  const file = args.find((a, i) => !a.startsWith("-") && i !== nIdx + 1);
  if (!file) { addTerminalLine('<span class="t-error">使い方: head [-n 行数] ファイル名</span>'); return; }
  const node = getNode(resolvePath(file));
  if (!node) { addTerminalLine(`<span class="t-error">head: ${escapeHtml(file)}: No such file or directory</span>`); return; }
  const lines = (node.content || "").split("\n").slice(0, n).join("\n");
  addTerminalLine(`<span class="t-output">${escapeHtml(lines)}</span>`);
}

function doTailSingle(args) {
  const nIdx = args.indexOf("-n");
  const n = nIdx !== -1 ? parseInt(args[nIdx + 1]) || 10 : 10;
  const file = args.find((a, i) => !a.startsWith("-") && i !== nIdx + 1);
  if (!file) { addTerminalLine('<span class="t-error">使い方: tail [-n 行数] ファイル名</span>'); return; }
  const node = getNode(resolvePath(file));
  if (!node) { addTerminalLine(`<span class="t-error">tail: ${escapeHtml(file)}: No such file or directory</span>`); return; }
  if (args.includes("-f")) { addTerminalLine(`<span class="t-system">==> ${escapeHtml(file)} <==\n${escapeHtml((node.content || "").split("\n").slice(-5).join("\n"))}\n<span class="t-hint">（-f オプション: リアルタイム監視。実際のターミナルではここで止まります）</span></span>`); return; }
  const lines = (node.content || "").split("\n");
  addTerminalLine(`<span class="t-output">${escapeHtml(lines.slice(Math.max(0, lines.length - n)).join("\n"))}</span>`);
}

function doSortSingle(args) {
  const file = args.find(a => !a.startsWith("-"));
  if (!file) { addTerminalLine('<span class="t-error">使い方: sort [-r] ファイル名</span>'); return; }
  const node = getNode(resolvePath(file));
  if (!node) { addTerminalLine(`<span class="t-error">sort: ${escapeHtml(file)}: No such file or directory</span>`); return; }
  const lines = (node.content || "").split("\n").filter(Boolean);
  const sorted = args.includes("-r") ? lines.sort().reverse() : lines.sort();
  addTerminalLine(`<span class="t-output">${escapeHtml(sorted.join("\n"))}</span>`);
}

function doFind(args) {
  const nameIdx = args.indexOf("-name");
  const namePattern = nameIdx !== -1 ? args[nameIdx + 1].replace(/^["']|["']$/g, "") : null;
  const results = [];
  const search = (node, path) => {
    if (!node.children) return;
    for (const [n, child] of Object.entries(node.children)) {
      const fullPath = path + "/" + n;
      if (!namePattern || matchGlob(n, namePattern)) results.push("." + fullPath);
      if (child.type === "dir") search(child, fullPath);
    }
  };
  search(vfs, "");
  if (results.length) addTerminalLine(`<span class="t-output">${escapeHtml(results.join("\n"))}</span>`);
}

function matchGlob(name, pattern) {
  const regex = new RegExp("^" + pattern.replace(/\./g, "\\.").replace(/\*/g, ".*") + "$");
  return regex.test(name);
}

function doPing(args) {
  const countIdx = args.indexOf("-c");
  const count = countIdx !== -1 ? parseInt(args[countIdx + 1]) || 4 : 4;
  const host = args.find(a => !a.startsWith("-") && a !== String(count)) || "";
  if (!host) { addTerminalLine('<span class="t-error">使い方: ping [-c 回数] <ホスト名/IPアドレス></span>'); return; }
  const rows = Array.from({ length: count }, (_, i) =>
    `64 bytes from ${host}: icmp_seq=${i} ttl=55 time=${(10 + Math.random() * 5).toFixed(1)} ms`
  ).join("\n");
  addTerminalLine(`<span class="t-output">PING ${escapeHtml(host)}: 56 data bytes\n${rows}\n--- ${escapeHtml(host)} ping statistics ---\n${count} packets transmitted, ${count} received, 0.0% packet loss</span>`);
}

function doCurl(args) {
  const url = args.find(a => !a.startsWith("-"));
  if (!url) { addTerminalLine('<span class="t-error">使い方: curl [-X METHOD] <URL></span>'); return; }
  const method = args.includes("-X") ? args[args.indexOf("-X") + 1] : "GET";
  addTerminalLine(`<span class="t-output">{
  "url": "${escapeHtml(url)}",
  "method": "${method}",
  "status": 200,
  "message": "OK",
  "timestamp": "${new Date().toISOString()}"
}</span>`);
}

function doWget(args) {
  const url = args.find(a => !a.startsWith("-"));
  if (!url) { addTerminalLine('<span class="t-error">使い方: wget <URL></span>'); return; }
  const fname = url.split("/").pop() || "index.html";
  addTerminalLine(`<span class="t-output">--${new Date().toLocaleTimeString()}--  ${escapeHtml(url)}
HTTP request sent, awaiting response... 200 OK
Length: 102400 (100K)
Saving to: '${escapeHtml(fname)}'

${escapeHtml(fname)}: downloaded [102400/102400]

'${escapeHtml(fname)}' saved [102400]</span>`);
  const cwdNode = getNode(cwd);
  if (cwdNode && cwdNode.children) {
    cwdNode.children[fname] = { type: "file", content: `[ダウンロード済み: ${url}]` };
  }
}

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttr(str) {
  return String(str).replace(/'/g, "\\'").replace(/"/g, "&quot;");
}

// ===== クイズ =====
let quizQuestions = [];
let quizIdx = 0;
let quizScore = 0;
let quizAnswered = false;
let quizWrongList = [];

function startQuiz() {
  document.getElementById("quiz-overlay").classList.add("open");
  document.getElementById("quiz-result-screen").style.display = "none";
  document.getElementById("quiz-question-screen").style.display = "block";
  generateQuiz();
  showQuestion();
}

function closeQuiz() {
  document.getElementById("quiz-overlay").classList.remove("open");
}

function closeQuizOverlay(e) {
  if (e.target === document.getElementById("quiz-overlay")) closeQuiz();
}

function retryQuiz() {
  document.getElementById("quiz-result-screen").style.display = "none";
  document.getElementById("quiz-question-screen").style.display = "block";
  generateQuiz();
  showQuestion();
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function generateQuiz() {
  quizQuestions = [];
  quizIdx = 0;
  quizScore = 0;
  quizWrongList = [];

  const pool = shuffle(COMMANDS).slice(0, 10);

  pool.forEach(cmd => {
    const type = Math.random() > 0.5 ? "cmd2desc" : "desc2cmd";
    const others = shuffle(COMMANDS.filter(c => c.name !== cmd.name)).slice(0, 3);

    if (type === "cmd2desc") {
      quizQuestions.push({
        type: "cmd2desc",
        question: cmd.name,
        correct: cmd.short,
        choices: shuffle([cmd.short, ...others.map(o => o.short)]),
        explain: cmd.desc,
        cmdName: cmd.name,
      });
    } else {
      quizQuestions.push({
        type: "desc2cmd",
        question: cmd.short,
        correct: cmd.name,
        choices: shuffle([cmd.name, ...others.map(o => o.name)]),
        explain: cmd.desc,
        cmdName: cmd.name,
      });
    }
  });
}

function showQuestion() {
  const q = quizQuestions[quizIdx];
  quizAnswered = false;

  const total = quizQuestions.length;
  document.getElementById("quiz-progress-text").textContent = `問題 ${quizIdx + 1} / ${total}`;
  document.getElementById("quiz-progress-bar").style.width = `${(quizIdx / total) * 100}%`;
  document.getElementById("quiz-score-num").textContent = quizScore;
  document.getElementById("quiz-feedback").innerHTML = "";
  document.getElementById("quiz-explain").className = "quiz-explain";
  document.getElementById("quiz-explain").innerHTML = "";
  document.getElementById("quiz-next").style.display = "none";

  const badge = document.getElementById("quiz-type-badge");
  if (q.type === "cmd2desc") {
    badge.textContent = "コマンド → 説明を選ぶ";
    badge.className = "quiz-type-badge";
    document.getElementById("quiz-question").innerHTML = `<code>${escapeHtml(q.question)}</code> の説明はどれ？`;
  } else {
    badge.textContent = "説明 → コマンドを選ぶ";
    badge.className = "quiz-type-badge type-desc";
    document.getElementById("quiz-question").innerHTML = `「${escapeHtml(q.question)}」コマンドはどれ？`;
  }

  // インデックスで管理（JSON.stringifyによるHTML属性バグを回避）
  document.getElementById("quiz-choices").innerHTML = q.choices.map((c, i) => `
    <button class="quiz-choice" onclick="checkAnswer(${i})">
      ${q.type === "desc2cmd" ? `<code>${escapeHtml(c)}</code>` : escapeHtml(c)}
    </button>
  `).join("");
}

function checkAnswer(idx) {
  if (quizAnswered) return;
  quizAnswered = true;

  const q = quizQuestions[quizIdx];
  const selected = q.choices[idx];
  const isCorrect = selected === q.correct;
  const correctIdx = q.choices.indexOf(q.correct);

  const btns = document.querySelectorAll(".quiz-choice");
  btns.forEach(b => b.disabled = true);

  if (isCorrect) {
    quizScore++;
    btns[idx].classList.add("correct");
    document.getElementById("quiz-feedback").innerHTML = '<span class="feedback-correct">✓ 正解！</span>';
  } else {
    btns[idx].classList.add("wrong");
    btns[correctIdx].classList.add("correct");
    quizWrongList.push(q.cmdName);
    document.getElementById("quiz-feedback").innerHTML = '<span class="feedback-wrong">✗ 不正解</span>';
  }

  document.getElementById("quiz-score-num").textContent = quizScore;
  const explainEl = document.getElementById("quiz-explain");
  explainEl.innerHTML = `正解: <strong>${escapeHtml(q.correct)}</strong><br>${escapeHtml(q.explain)}`;
  explainEl.className = "quiz-explain visible";
  document.getElementById("quiz-next").style.display = "block";
}

function nextQuestion() {
  quizIdx++;
  if (quizIdx >= quizQuestions.length) {
    showResult();
  } else {
    showQuestion();
  }
}

function showResult() {
  document.getElementById("quiz-question-screen").style.display = "none";
  document.getElementById("quiz-result-screen").style.display = "block";

  const total = quizQuestions.length;
  const pct = Math.round((quizScore / total) * 100);

  const [emoji, label] = pct === 100 ? ["🎉", "パーフェクト！"] :
                          pct >= 80  ? ["👏", "すごい！"] :
                          pct >= 60  ? ["💪", "もう少し！"] :
                          pct >= 40  ? ["📚", "復習しよう"] :
                                       ["🌱", "これから頑張ろう"];

  document.getElementById("result-emoji").textContent = emoji;
  document.getElementById("result-label").textContent = label;
  document.getElementById("result-score").textContent = quizScore;
  document.getElementById("result-score-total").textContent = ` / ${total}問`;

  let breakdown = `正解率: <span>${pct}%</span>`;
  if (quizWrongList.length > 0) {
    breakdown += `<br>復習おすすめ: <span>${[...new Set(quizWrongList)].join("  ")}</span>`;
  }
  document.getElementById("result-breakdown").innerHTML = breakdown;

  // 間違えたコマンドを習得リストから外す（任意）
  document.getElementById("quiz-progress-bar").style.width = "100%";
}

// ===== 起動 =====
init();
