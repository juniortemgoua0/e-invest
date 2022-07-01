import {CircularProgressbar} from "react-circular-progressbar";
import React, {createRef} from "react";
import './SemiCircularProgressbar.css';


type State = {
  progression: number,
  progressionStep: "asc" | "desc" | "stop",
  timer: number | undefined,
  timer2: number | undefined,
  timer3: number | undefined,
  timer4: number | undefined,
  trail: SVGPathElement | null,
  path: SVGPathElement | null,
  text: SVGTextElement | null,
}

type Props = {
  children?: React.ReactNode,
  debit: number,
  actif: number
}

export class SemiCircularProgressbar extends React.Component<Props, State> {

  state: State = {
    progression: 50,
    progressionStep: "desc",
    timer: undefined,
    timer2: undefined,
    timer3: undefined,
    timer4: undefined,
    trail: null,
    path: null,
    text: null,
  }
  circleProgressbarRef = createRef<CircularProgressbar>()

  componentDidMount() {
    let progressTime = (this.props.debit * 36000000)

    function roundToTwo(number: number) {
      let round = number * 1000;          // 556.845
      round = Math.round(round); // 556
      return round / 1000
    }

    this.setState({
      timer3: window.setInterval(() => {
          if (this.state.progressionStep === "stop") {
            this.setState({timer3: undefined})
          } else if (this.state.progressionStep === "desc") {
            this.setState((state, props) => ({progression: roundToTwo(state.progression - 0.001)}))
            // console.log(this.state.progression)
          } else if (this.state.progressionStep === "asc") {
            this.setState((state, props) => ({progression: roundToTwo(state.progression + 0.001)}))
          }
        },
        // progressTime
        100
      )
    })

    this.setState({
        timer: window.setInterval(() => {
            if (this.state.progressionStep === "desc") {
              if (this.state.progression > 0) {
                this.setState((state, props) => ({progression: state.progression - 1}))
              } else {
                this.setState((props, state) => ({progressionStep: "asc"}))
              }
            }
          },
          progressTime
          // 100
        )
      }
    );

    this.setState(
      (state, props) => ({
          timer2: window.setInterval(() => {
              if (this.state.progressionStep === "asc") {
                this.setState({timer: undefined})
                if (this.state.progression >= 0 && this.state.progression < 100) {
                  this.setState((state, props) => ({progression: state.progression + 1}))
                } else if (this.state.progression >= 100) {
                  this.setState({timer3: undefined})
                  this.setState((props, state) => ({progressionStep: "stop"}))
                  this.setState({timer2: undefined})
                }
              }
            },
            progressTime
            // 100
          )
        }
      )
    );
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
    (document.getElementsByClassName('CircularProgressbar-path')[0] as SVGPathElement).style.stroke = `hsl(${prevState.progression}, 100%, 50%)`;
    (document.getElementsByClassName('solde-text')[0] as HTMLDivElement).style.color = `hsl(${prevState.progression}, 100%, 50%)`;
    // (document.getElementsByClassName('CircularProgressbar-trail')[1] as SVGPathElement).style.display = `none`;
    (document.getElementsByClassName('CircularProgressbar-text')[0] as SVGTextElement).style.fill = `hsl(${prevState.progression}, 100%, 50%)`
  }

  componentWillUnmount() {
    this.setState({timer: undefined});
    this.setState({timer2: undefined});
    this.setState({timer3: undefined});
  }

  render() {
    const {progression} = this.state
    return (
      <>
        <div className="semi-progress-circle">
          <CircularProgressbar
            ref={this.circleProgressbarRef}
            value={progression}
            text={`${progression}%`}
            circleRatio={0.6}
            styles={{
              trail: {
                transform: 'rotate(-108deg)',
                transformOrigin: 'center center'
              },
              path: {
                transform: 'rotate(-108deg)',
                transformOrigin: 'center center'
              }
            }}
          />
          <div className="progress-cover">
            {/*<CircularProgressbar*/}
            {/*  ref={this.circleProgressbarRef}*/}
            {/*  value={10}*/}
            {/*  circleRatio={0.6}*/}
            {/*  styles={{*/}
            {/*    trail: {*/}
            {/*      transform: 'rotate(-108deg)',*/}
            {/*      transformOrigin: 'center center'*/}
            {/*    },*/}
            {/*    path: {*/}
            {/*      transform: 'rotate(-108deg)',*/}
            {/*      transformOrigin: 'center center'*/}
            {/*    }*/}
            {/*  }}*/}
            {/*/>*/}
          </div>
          <div className="d-flex flex-column align-items-center text-black position-absolute actif-group">
            <img src="/img/icon_graph_up.svg" alt=""/>
            <span className="text-white opacity-50 mt-1">Actif</span>
            <div className="text-white"><span className="fs-2">2 321 </span> <span className="small"> FCFA</span></div>
          </div>
          <div className="solde-text">Solde</div>
          <div className="percent-text text-0">0%</div>
          <div className="percent-text text-100">100%</div>
        </div>
      </>
    );
  }
}
