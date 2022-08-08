import {CircularProgressbar} from "react-circular-progressbar";
import React, {createRef, useEffect, useRef, useState} from "react";
import './SemiCircularProgressbar.css';
import axios from "axios";
import {LocalStorage} from "../../helpers/enums/localStorage.enum";

type State = {
  progression: number,
  progressionStep: "asc" | "desc" | "stop",
  trail: SVGPathElement | null,
  path: SVGPathElement | null,
  text: SVGTextElement | null,
}

type Props = {
  children?: React.ReactNode,
  debit: number | string,
  actif: number,
  progression: number,
  status?: 0 | -1,
  onSetActif: (actif: string) => void,
  onSetFinish: (isFinish: boolean) => void,
}

export function roundToTwo(number: number) {
  let round = number * 1000;          // 556.845
  round = Math.round(round); // 556
  return round / 1000
}

export function SemiCircularProgressbar({debit, actif, progression, status, onSetActif, onSetFinish}: Props) {

  const [state, setState] = useState<State>({
    progression: 0,
    progressionStep: "desc",
    trail: null,
    path: null,
    text: null,
  })
  const factor = 3

  const [counter, setCounter] = useState<number>(100 / factor);
  const [actif2, setActif2] = useState<number>(actif);
  const [stop, setStop] = useState<boolean>(false);
  const [finish, setFinish] = useState<boolean>(false);
  const [settings, setSettings] = useState<any>()
  const [percent, setPercent] = useState<string>()
  const [isOnZero , setIsOnZero] = useState<boolean>(false)

  let currentUser = JSON.parse(localStorage.getItem(LocalStorage.CURRENT_USER) as string);
  let currentBet = JSON.parse(localStorage.getItem(LocalStorage.CURRENT_BET) as string);

  const circleProgressbarRef = useRef(null)
  let timer: number | undefined = undefined
  let i: number = progression;
  let actifProps: number = actif;


  let decreaseInterval: number | undefined = undefined
  const decreaseBet = () => {
    let count: number = counter
    if (decreaseInterval) {
      window.clearInterval(decreaseInterval)
    }
    if (!stop) {
      setActif2(currentBet.bet_amount);
      setCounter(100 / factor);
      decreaseInterval = window.setInterval(() => {

        if (count === 0) {
          setStop(true)
          window.clearInterval(decreaseInterval);
        } else {
          setCounter(prevCounter => Math.round((prevCounter - 0.01) * 100) / 100)
          count = (Math.round((count - 0.01) * 100) / 100)
        }
        setActif2((prevActif) =>
          prevActif < 0
            ? 0
            : Math.round((prevActif - (factor * currentBet.bet_amount) / (100 * 100)) * 100) / 100
        );
      }, 1);
    } else {
    }
  }

  useEffect(() => {
    decreaseBet();
    return () => {
      decreaseInterval = undefined
      window.clearInterval(decreaseInterval)
    }
  }, [stop]);

  // Initialize of the increase features
  let increaseInterval: number | undefined = undefined;
  const increaseBet = () => {
    let count: number = counter

    if (increaseInterval) {
      window.clearInterval(increaseInterval)
      increaseInterval = undefined
    }

    if (stop && !finish) {
      increaseInterval = window.setInterval(() => {
        if (count < 100 && !finish) {
          setCounter(prevCounter => Math.round((prevCounter + 0.01) * 100) / 100)
          count = ((count + 0.01) * 100) / 100
        } else {
          window.clearInterval(increaseInterval)
          increaseInterval = undefined
          setFinish(true)
          onSetFinish(true)
          const currentBet = JSON.parse(localStorage.getItem(LocalStorage.CURRENT_BET) as string)
          axios.put(`${process.env.REACT_APP_API_URI}bet/${currentBet?._id}`, {
            ...currentBet,
            status: "Terminer",
            end_of_bet: new Date()
          }).then(r => console.log(r))
            .catch(err => console.log(err))
        }
        setActif2((prevActif) =>
          prevActif < currentBet.bet_amount * factor
            ? Math.round((prevActif + (currentBet.bet_amount * factor) / (100 * 100)) * 100) / 100
            : currentBet.bet_amount * factor
        );
      }, 1);
    } else {
      window.clearInterval(increaseInterval)
      increaseInterval = undefined
    }
  };

  useEffect(() => {
    if (counter === 0.01)
      setIsOnZero(true)
      window.setTimeout(()=> {
        setIsOnZero(false)
        increaseBet();
      }, 3000)
    return () => {
      increaseInterval = undefined
      window.clearInterval(increaseInterval)
    }
  }, [stop, finish]);

  useEffect(() => {
    let solde = String(currentBet.bet_amount * factor)
    let pendingActif = String(actif2)
    let currentActif = String(actif2).split('.')
    if (currentActif[1]) {
      if (currentActif[1].length < 2) {
        pendingActif = pendingActif + '0'
      }

      const actifLength = currentActif[0].length
      const soldeLenght = solde.length
      if (actifLength < soldeLenght) {
        const rest = soldeLenght - actifLength
        for (i = 0; i < rest; i++) {
          pendingActif = '0' + pendingActif
        }
      }
    } else {
      const actifLength = pendingActif.length
      const soldeLenght = solde.length
      if (actifLength < soldeLenght) {
        const rest = soldeLenght - actifLength
        for (i = 0; i < rest; i++) {
          pendingActif = '0' + pendingActif
        }
      }
      pendingActif = pendingActif + '.00'
    }
    onSetActif(pendingActif)
  }, [actif2])

  useEffect(() => {
    let percentage = String(counter)
    const start = percentage.split('.')
    if (start[0].length < 2) {
      percentage = '0' + percentage
    }
    if (percentage.length < 5 && percentage !== '100') {
      percentage = percentage + '0'
      setPercent(percentage)
    } else {
      setPercent(percentage)
    }
    if(counter=== 0){
      setPercent(String(0))
    }
  }, [counter])


  useEffect(() => {
    (document.getElementsByClassName('CircularProgressbar-path')[0] as SVGPathElement).style.stroke = `hsl(${counter}, 100%, 50%)`;
    // (document.getElementsByClassName('solde-text')[0] as HTMLDivElement).style.color = `hsl(${counter}, 100%, 50%)`;
    (document.getElementsByClassName('CircularProgressbar-text')[0] as SVGTextElement).style.fill = `hsl(${counter}, 100%, 50%)`
  }, [counter])

  return (
    <div className="container-progress">
      <div className="semi-progress-circle">
        <CircularProgressbar
          ref={circleProgressbarRef}
          value={counter}
          text={`${percent}%`}
          circleRatio={0.6}
          styles={{
            trail: {
              transform: 'rotate(-108deg)',
              transformOrigin: 'center center',
            },
            path: {
              transform: 'rotate(-108deg)',
              transformOrigin: 'center center',
            }
          }}
        />
        <div className="d-flex flex-column align-items-center text-black position-absolute actif-group">
          <img src="/img/icon_graph_up.svg" alt=""/>
        </div>
        {/*<div className="solde-text">Solde</div>*/}
        {
          isOnZero && <span className='blue-point'></span>
        }
        <div className="percent-text text-0 fs-4">0%</div>
        <div className="percent-text text-100 fs-4">100%</div>
      </div>
    </div>
  );
}
