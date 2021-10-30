import React, { useState, useCallback, useMemo } from "react";
import { ChildArea } from "./ChildArea";
import "./styles.css";

export default function App() {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const onChangeText = (e) => setText(e.target.value);

  const onClickOpen = () => setOpen(!open);

  // 変数自体のメモ化 計算された値はから配列にしているので、最初に読み込まれた時だけ行われて、あとは
  // tempというのは4という値が使い回されるということ。
  const temp = useMemo(() => 1 + 3, []);
  console.log(temp);

  // アロー関数で書いた関数は毎回新しい関数を生成していると判断される。
  // ->毎回違う関数がpropsとしてChildAreaに渡されることになる。
  // const onClickClose = () => setOpen(false);

  // useCallbackを使うことで、それが防げる。
  // 第二引数空らの配列を設けることで、最初に生成された関数だけを使うことができる。
  // （再レンダリング前の本来の関数のこと）
  const onClickClose = useCallback(() => setOpen(false), []);

  return (
    <div className="App">
      <input value={text} onChange={onChangeText} />
      <br />
      <br />
      <button onClick={onClickOpen}>表示</button>
      <ChildArea open={open} onClickClose={onClickClose} />
    </div>
  );
}
