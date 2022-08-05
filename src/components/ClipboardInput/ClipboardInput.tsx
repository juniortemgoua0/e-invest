import React, {useEffect, useState} from 'react';
import './ClipboardInput.css';
import {BsClipboard, BsClipboardCheck} from "react-icons/all";
import CopyToClipboard from 'react-copy-to-clipboard';

type Props = {
  value: string
}

export function ClipboardInput({value}: Props): JSX.Element {

  const [isCopied, setIsCopied] = useState<boolean>(false)
  useEffect(() => {
    if (isCopied) {
      window.setTimeout(() => {
        setIsCopied(false)
      }, 5000)
    }
  }, [isCopied])

  return (
    <div className="w-100 text-end">
      <div className="w-100 position-relative">
        <input
          type="text"
          className="clipboard-input"
          value={value}
        />
        <CopyToClipboard
          text={value}
          onCopy={() => setIsCopied(true)}>
          <span className="clipboard-copy d-flex justify-content-center align-items-center">
            {isCopied ? <BsClipboardCheck size={24} color={'green'}/> : <BsClipboard size={24}/>}
          </span>
        </CopyToClipboard>
      </div>
      {isCopied && <p className="text-success">copié</p>}
    </div>
  );
}
