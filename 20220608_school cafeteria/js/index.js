const showToday = () => {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();
    let day = now.getDay(); // 0 ~ 6, 0: 일요일, 6: 토요일

    let namesOfTheDaysOfTheWeek_array = ["일", "월" ,"화","수","목","금","토",];
    day = namesOfTheDaysOfTheWeek_array[day];
    
    let title = `${year}.${month}.${date}(${day})`;

    // HTML 표시
    // let cardDataDivs = document.getElementsByClassName('card-date');
    let cardDataDivs = document.querySelectorAll('.card-date');
    console.log(cardDataDivs)

    for (cardDataDiv of cardDataDivs) {
        cardDataDiv.innerHTML = title;
    } 
}

showToday()

const addNow = (mainCardId) => {
    //html -> js
    const mainCard = document.getElementById(mainCardId);
    
    /* 현 시각(index)을 알고 / 아이디 값을 가지고 있는 값을 가져옴. 다음 식사가 몇 번째 카드에 위치해있는지*/
    let now = new Date();
    let hour = now.getHours();
    let min = now.getMinutes();
    console.log(`${hour}시 ${min}분`);

    //현재의 시와 분을 분으로 단위 통일
    minutes = hour * 60 + min;
    let index = 0;

    // 조식 끝 : 7시 30분 -> 1 / 중식 끝 : 13시 10분 -> 2 / 석식 끝 : 18시 10분 - > 0 (다음 날 조식)
    if (18 * 60 + 10 <= minutes){
        index = 0;
    }
    else if (13 * 60 + 10 <= minutes) {
        index = 2;
    }
    else if (7 * 60 + 30 <= minutes) {
        index = 1;
    }
    else {
        index = 0;
    }

    
    let selectedCard = mainCard.getElementsByClassName('card')[index];
    /* .now 클래스 추가해서 알아보기 */
    selectedCard.classList.add('now');
}

addNow('main-card');

// 급식 멘ㅈ뉴ㅜ 표시하장~~~~
const showTodayMenu = () => {
    // 년, 월, 일 구하기
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let date = now.getDate();

    // 급식 API url 만들어서 구하고 year, month, date 정보 가져와서 url 생성
    const KEY = "42a1d43c85f848fdaed1ad5a7b5325ab";
    const ATPT_OFCDC_SC_CODE = "B10";           // 서울특별시교육청
    const SD_SCHUL_CODE = "7010569";            // 미림여자정보과학고
    let MLSV_YMD = `${year}${month.toString().padStart(2, "0")}${date.toString().padStart(2, "0")}`;    // 2022 / 10 / 19
    // 한자리의 경우 앞자리에 0을 넣어야 함 ex) 3일 -> 03
    // let MMEAL_SC_CODE = 2;                   // 중식2 석식3 조식1

    let url = `https://open.neis.go.kr/hub/mealServiceDietInfo`;

    url += `?KEY=${KEY}`;
    url += `&Type=json`;
    url += `&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}`;
    url += `&SD_SCHUL_CODE=${SD_SCHUL_CODE}`;
    url += `&MLSV_YMD=${MLSV_YMD}`;
    // url += `&MMEAL_SC_CODE=${MMEAL_SC_CODE}`;

    console.log(url);

    // 비동기로 호출
    fetch(url).then((response) => response.json()).then((json) => console.log(json)); // 신기술 비동기 호출 -> AJAX
    // = 응답이 오면 문자열인 것을 json으로 형변환해라

    // 응답오면 표시
}

showTodayMenu();