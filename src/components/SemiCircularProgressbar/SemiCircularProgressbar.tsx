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
  onSetActif: (actif: string) => void
}

export function roundToTwo(number: number) {
  let round = number * 1000;          // 556.845
  round = Math.round(round); // 556
  return round / 1000
}

export function SemiCircularProgressbar({debit, actif, progression, status, onSetActif}: Props) {

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
        if (count < 0) {
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
      }, 5);
    }
  }

  useEffect(() => {
    decreaseBet();
  }, [stop]);

  // Initialize of the increase features
  let increaseInterval: number | undefined = undefined;
  const increaseBet = () => {
    let count: number = counter

    if (increaseInterval) {
      window.clearInterval(increaseInterval)
    }

    if (stop && !finish) {
      increaseInterval = window.setInterval(() => {
        if (count < 100 && !finish) {
          setCounter(prevCounter => Math.round((prevCounter + 0.01) * 100) / 100)
          count = ((count + 0.01) * 100) / 100
        } else {
          // setCounter(100)
          setFinish(true)
          const currentBet = JSON.parse(localStorage.getItem(LocalStorage.CURRENT_BET) as string)
          axios.put(`${process.env.REACT_APP_API_URI}bet/${currentBet?._id}`, {
            ...currentBet,
            status: "Terminer"
          })
        }
        setActif2((prevActif) =>
          prevActif < currentBet.bet_amount * factor
            ? Math.round((prevActif + (currentBet.bet_amount * factor) / (100 * 100)) * 100) / 100
            : currentBet.bet_amount * factor
        );
      }, 5);

      if (finish) {
      }
    }
  };

  useEffect(() => {
    let pendingActif = String(actif2)
    let currentActif = String(actif2).split('.')
    if (currentActif[1]) {
      if (currentActif[1].length < 2) {
        pendingActif = pendingActif + '0'
      }

      let solde = String(currentBet.bet_amount * factor)
      const actifLength = currentActif[0].length
      const soldeLenght = solde.length
      if (actifLength < soldeLenght) {
        const rest = soldeLenght - actifLength
        for (i = 0; i < rest; i++) {
          pendingActif = '0' + pendingActif
        }
      }
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
  }, [counter])

  useEffect(() => {
    increaseBet();
  }, [stop, finish]);

  //
  // useEffect(() => {
  //
  //   let progress = localStorage.getItem('progression')
  //   let step = localStorage.getItem('progressionStep')
  //
  //   if (progress) {
  //     i = Number.parseInt(progress)
  //   } else {
  //     i = progression
  //   }
  //
  //   if (!step) {
  //     step = 'desc'
  //   }
  //
  //   if (status === 0) {
  //     setState((state => ({...state, progression: progression})));
  //
  //     let progressTime: number = (debit as number) * 36
  //
  //     timer = window.setInterval(() => {
  //         console.log('timer')
  //         if (step === "desc") {
  //           if (i <= 0) {
  //             // this.setState((state, props) => ({progression: state.progression - 1}))
  //             step = "asc"
  //           }
  //         } else if (step === "asc") {
  //           if (i >= 0 && i < 100) {
  //             // this.setState((state, props) => ({progression: state.progression + 1}))
  //           } else if (i >= 100) {
  //             step = "stop"
  //             localStorage.removeItem('progressionStep')
  //             timer = undefined
  //             const currentBet = JSON.parse(localStorage.getItem(LocalStorage.CURRENT_BET) as string)
  //             axios.put(`${process.env.REACT_APP_API_URI}bet/${currentBet?._id}`, {
  //               ...currentBet,
  //               status: "Terminer"
  //             })
  //           }
  //         }
  //
  //         if (step === "desc") {
  //           setState(state => ({...state, progression: roundToTwo(i - 0.001)}));
  //           i = i - 0.001;
  //           localStorage.setItem("progression", i.toString());
  //
  //           // Oretorune le nouvel actif en fonction de l'etat de progression --------------
  //           onSetActif(actifProps * (progression / 100))
  //           //------------------------------------------------------------------------------
  //
  //           actifProps = actifProps - actifProps * 0.0002
  //           // console.log('step ===> desc')
  //           // console.log(this.state.progression)
  //         } else if (step === "asc") {
  //           localStorage.setItem('progressionStep', 'asc')
  //           // console.log('step ===> asc')
  //           setState(state => ({...state, progression: roundToTwo(i + 0.001)}))
  //           i = i + 0.001
  //           onSetActif(actifProps + actifProps * 0.002)
  //           actifProps = actifProps + actifProps * 0.002
  //           localStorage.setItem("progression", i.toString())
  //         }
  //       },
  //       progressTime
  //       // 100
  //     )
  //   }
  //
  // }, [])

  useEffect(() => {
    // (document.getElementsByClassName('CircularProgressbar-path')[0] as SVGPathElement).style.stroke = `hsl(${state.progression}, 100%, 50%)`;
    (document.getElementsByClassName('CircularProgressbar-path')[0] as SVGPathElement).style.stroke = `hsl(${counter}, 100%, 50%)`;
    // (document.getElementsByClassName('solde-text')[0] as HTMLDivElement).style.color = `hsl(${state.progression}, 100%, 50%)`;
    (document.getElementsByClassName('solde-text')[0] as HTMLDivElement).style.color = `hsl(${counter}, 100%, 50%)`;
    // (document.getElementsByClassName('CircularProgressbar-text')[0] as SVGTextElement).style.fill = `hsl(${state.progression}, 100%, 50%)`
    (document.getElementsByClassName('CircularProgressbar-text')[0] as SVGTextElement).style.fill = `hsl(${counter}, 100%, 50%)`
  }, [state.progression, counter])

  return (
    <div className="container-progress">
      <div className="semi-progress-circle">
        <CircularProgressbar
          ref={circleProgressbarRef}
          // value={state.progression}
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
        <div className="solde-text">Solde</div>
        <div className="percent-text text-0 fs-4">0%</div>
        <div className="percent-text text-100 fs-4">100%</div>
      </div>
    </div>
  );
}

//
// export class SemiCircularProgressbar2 extends React.Component<Props, State> {
//
//   state: State = {
//     progression: 0,
//     progressionStep: "desc",
//     timer: undefined,
//     timer2: undefined,
//     timer3: undefined,
//     timer4: undefined,
//     trail: null,
//     path: null,
//     text: null,
//   }
//
//
//   circleProgressbarRef = createRef<CircularProgressbar>()
//
//   componentDidMount() {
//
//     function roundToTwo(number: number) {
//       let round = number * 1000;          // 556.845
//       round = Math.round(round); // 556
//       return round / 1000
//     }
//
//     if (this.props.status === 0){
//       this.setState( (state, props) => ({progression: props.progression}))
//
//       let progressTime = 100
//
//       this.setState({
//         timer3: window.setInterval(() => {
//             if (this.state.progressionStep === "stop") {
//               this.setState({timer3: undefined})
//             } else if (this.state.progressionStep === "desc") {
//               this.setState((state, props) => ({progression: roundToTwo(state.progression - 0.001)}))
//               localStorage.setItem("progression" , this.state.progression.toString())
//               // console.log(this.state.progression)
//             } else if (this.state.progressionStep === "asc") {
//               this.setState((state, props) => ({progression: roundToTwo(state.progression + 0.001)}))
//             }
//           },
//           progressTime
//           // 100
//         )
//       })
//
//       this.setState({
//           timer: window.setInterval(() => {
//               if (this.state.progressionStep === "desc") {
//                 if (this.state.progression > 0) {
//                   // this.setState((state, props) => ({progression: state.progression - 1}))
//                 } else {
//                   this.setState((props, state) => ({progressionStep: "asc"}))
//                 }
//               }
//             },
//             progressTime
//             // 100
//           )
//         }
//       );
//
//       this.setState(
//         (state, props) => ({
//             timer2: window.setInterval(() => {
//                 if (this.state.progressionStep === "asc") {
//                   this.setState({timer: undefined})
//                   if (this.state.progression >= 0 && this.state.progression < 100) {
//                     // this.setState((state, props) => ({progression: state.progression + 1}))
//                   } else if (this.state.progression >= 100) {
//                     this.setState({timer3: undefined})
//                     this.setState((props, state) => ({progressionStep: "stop"}))
//                     this.setState({timer2: undefined})
//                   }
//                 }
//               },
//               progressTime
//               // 100
//             )
//           }
//         )
//       );
//     }
//   }
//
//   componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
//     (document.getElementsByClassName('CircularProgressbar-path')[0] as SVGPathElement).style.stroke = `hsl(${prevState.progression}, 100%, 50%)`;
//     (document.getElementsByClassName('solde-text')[0] as HTMLDivElement).style.color = `hsl(${prevState.progression}, 100%, 50%)`;
//     // (document.getElementsByClassName('CircularProgressbar-trail')[1] as SVGPathElement).style.display = `none`;
//     (document.getElementsByClassName('CircularProgressbar-text')[0] as SVGTextElement).style.fill = `hsl(${prevState.progression}, 100%, 50%)`
//   }
//
//   componentWillUnmount() {
//     this.setState({timer: undefined});
//     this.setState({timer2: undefined});
//     this.setState({timer3: undefined});
//   }
//
//   render() {
//     const {progression} = this.state
//     return (
//       <div className="container-progress">
//         <div className="semi-progress-circle">
//           <CircularProgressbar
//             ref={this.circleProgressbarRef}
//             value={progression}
//             text={`${progression}%`}
//             circleRatio={0.6}
//             styles={{
//               trail: {
//                 transform: 'rotate(-108deg)',
//                 transformOrigin: 'center center'
//               },
//               path: {
//                 transform: 'rotate(-108deg)',
//                 transformOrigin: 'center center'
//               }
//             }}
//           />
//           {/*<div className="progress-cover">*/}
//           {/*  <CircularProgressbar*/}
//           {/*    ref={this.circleProgressbarRef}*/}
//           {/*    value={10}*/}
//           {/*    circleRatio={0.6}*/}
//           {/*    styles={{*/}
//           {/*      trail: {*/}
//           {/*        transform: 'rotate(-108deg)',*/}
//           {/*        transformOrigin: 'center center'*/}
//           {/*      },*/}
//           {/*      path: {*/}
//           {/*        transform: 'rotate(-108deg)',*/}
//           {/*        transformOrigin: 'center center'*/}
//           {/*      }*/}
//           {/*    }}*/}
//           {/*  />*/}
//           {/*</div>*/}
//           <div className="d-flex flex-column align-items-center text-black position-absolute actif-group">
//             <img src="/img/icon_graph_up.svg" alt=""/>
//           </div>
//           <div className="solde-text">Solde</div>
//           <div className="percent-text text-0 fs-4">0%</div>
//           <div className="percent-text text-100 fs-4">100%</div>
//         </div>
//       </div>
//     );
//   }
// }
