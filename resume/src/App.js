import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    let [글제목,글제목변경] = useState(['이력서 작성','이력서 제출']);/*ES6 destructuring 문법*/

    let [projects,edit] = useState({ BTS:{title:'BuyTickets', tool:'eclipse', stack:'java 8', git:'https://github.com/bellasimi/BuyTicketS', good: 0, bad: 0},
                                                    Board:{title:'board', tool:'intelliJ', stack:'java 8', git:'https://github.com/bellasimi/board', good: 0, bad: 0},
                                                    nodeWeb:{title:'nodeWeb', tool:'intelliJ', stack:'node.js 16', git:'https://github.com/bellasimi/nodeWeb', good: 0, bad: 0}
                                                    });

    let [추천, 추천변경] = useState(0);
    let [비추, 비추변경] = useState(0);

    let [modal,modal변경] = useState(true); /* Modal창 변경 스위치 */
    let [프로젝트명, 프로젝트명변경] = useState(["BuyTicketS","Board","nodeWeb"]);


    let repArr = [];

    프로젝트명.map(() =>{
            repArr.push(0)
    });

    let [good,setGood] = useState(repArr);
    let [bad,setBad] = useState(repArr);


    var array = [1,2,3];

    /* map 반복문 같지 */

    var newArray = array.map(function(a){
        return a*2
    });

    function method(){
        return 100;
    }

    /*반복문 함수 */

    const repChange = (rep,idx) => {
        let goodArr = [...good];
        let badArr = [...bad];

        if(rep==bad){
            badArr[idx]+=1;
            setBad(badArr);

        }
        else{
            goodArr[idx]+=1;
            setGood(goodArr);
        }

    }



    function 제목변경(){ /* return 할 때 변수를 { 제목변경 }이라고 해야지 { 제목변경() }하면 오류
    왜냐, 바로 실행하란 뜻이어서 click 안했을 때도 실행함 */
        글제목변경(글제목 = ['이력서작성3','이력서 제출']);
        /* 변경(변경전 값과 같은 자료형);
        데이터를 아예 갈아치우는 함수라 같은 자료형이 변수로 들어가야해

        특정 행만 글제목[0] = '11'할 수 는 없고, 이러면 렌더링 안될 수 있다.
         var newArray = [...글제목];
         newArray[0] = '이력서 작성4';
         글제목변경( newArray );

         deep copy해서 수정하면 됨 -> 값 공유아니고 독립적인 값 복사
         이유: 리액트 대원칙: immutable data
        */
    }

    let [modalTitle,setModalTitle] = useState("모달 제목");
    let [modalIdx,setModalIdx] = useState(0);



  return (
  /* eslint-disable:에러 경고 안 띄워줌 */
  /*useState 안쓰고 그냥 변수+1하면 안바뀜*/
    <div className="App">
        <nav>
            <div className="nav_logo">개발의 SHIN </div>
            <div className="nav_menu">
                <li>archive</li>
                <li>contact</li>
                <li>About</li>
                <li>
                    { 글제목[0] }
                       <span onClick={() =>  { 글제목변경( ['이력서 작성2','이력서제출']) }}>✔</span>
                       <span onClick={ 제목변경 }>✔</span>

                </li>
            </div>
        </nav>
         <img src={logo} className="App-logo" alt="logo" />

            <div className="Resume">

                <p>
                안녕하세요 BackEnd 개발자 Shin입니다
                    <span onClick={ ()=> { 추천변경(추천+1)} }>👍</span>
                    <span> { 추천 } </span>
                    <span onClick ={ () => { 비추변경(비추+1) }}>👎</span>
                    <span> { 비추 } </span>
                </p>
                <button onClick = {() => { modal변경(false)}}>창닫기</button>
                <button onClick = {() => { modal변경(true)}}>창열기</button>

                <div onClick = { () => { modal변경(!modal); }}>
                    모달 조작 toggle
                </div>

                {
                    modal === true
                    ? <Modal modalTitle={modalTitle} modalIdx={modalIdx} 프로젝트명={프로젝트명}/>
                    : null
                }
                <div className="modal">
                    <h2>제목</h2>
                    <p>날짜</p>
                    <p>상세내용</p>
                </div>

                사이트이름 개발의 Shin은 두가지 의미가 있습니다.

                말그대로 개발의 신이 되겠다는 제 포부와
                제 애칭 Shin을 덧붙여 표현한 개발자로서의 자아입니다.
                <p>
                수많은 개발자 중에 한사람, 우주의 먼지같은 존재임을 잊지 않겠습니다.
                </p>
                조금 안다고 자만하거나 슬럼프에 빠지는 대신
                초심을 잃지 않고 정진하는 개발자가 되고 싶습니다.
                <p>
                현재까지 아래와 같은 프로젝트를 직행했습니다.
                </p>
            </div>
            <h1>프로젝트 목록</h1>
            {
                프로젝트명.map((각각의값,idx) => {
                    return (
                        <li onClick = { setModalTitle.bind(this,각각의값) }>{프로젝트명[idx]}
                            <span onClick = { () => {repChange(good,idx) } }>👍</span>
                            <span>
                                {good[idx]}

                            </span>
                            <span onClick=  { () => { repChange(bad,idx)} }>👎</span>
                            <span>
                                 {bad[idx]}
                            </span>
                        </li>

                    )
                })

            }
            <button onClick={setModalIdx.bind(null,0)}>0</button>
            <button onClick={()=>{setModalIdx(1)}}>1</button>
            <button onClick={()=>{setModalIdx(2)}}>2</button>
            <h1>프로젝트 상세</h1>
            <div>
               {projects.BTS.title}
               티켓 할인 구매 사이트

               <ul>
                   <li>
                   개발 스택 : {projects.BTS.stack}
                   </li>
                   <li>
                   개발 환경 : {projects.BTS.tool}
                   </li>
                   <li>
                   Github : {projects.BTS.git}
                   </li>
                   <li>
                   시연영상 :
                   </li>
               </ul>

           </div>

            <div>
            {projects.Board.title}
                기술 관련 게시판

                <ul>
                    <li>
                    개발 스택 :{projects.Board.stack}
                    </li>
                    <li>
                    개발 환경 : {projects.Board.tool}
                    </li>
                    <li>
                    Github :{projects.Board.git}
                    </li>
                    <li>
                    시연영상 :
                    </li>
                </ul>
            </div>

            <div>
                <p>
                웹 개발 관련 블로그
                </p>
                <ul>
                    <li>
                    개발 스택 :
                    </li>
                    <li>
                    개발 환경 :
                    </li>
                    <li>
                    Github :
                    </li>
                    <li>
                    시연영상 :
                    </li>
                </ul>
            </div>



    </div>
    /*<header className="App-header">
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>*/


  );
}

function Modal(props){
    return (
        <div className="modal">
            <h2>{props.modalTitle}</h2>
            <p>날짜</p>
            <p>상세내용</p>
            <p>{props.프로젝트명[props.modalIdx]}</p>
        </div>
    );
}


export default App;
