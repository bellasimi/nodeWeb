import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">

        <img src={logo} className="App-logo" alt="logo" />
        <div className="Resume">
            <p>
            안녕하세요 BackEnd 개발자 Shin입니다.
            사이트이름 개발의 Shin은 두가지 의미가 있습니다.
            </p>
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


        <div>
            티켓 할인 구매 사이트

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
        <div>
            기술 관련 게시판

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

        /*    <header className="App-header">

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

export default App;
