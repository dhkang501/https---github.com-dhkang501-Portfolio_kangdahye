"use strict";

//Make navbar transparent when it is on the top
//메뉴바 상단에 있을때 투명하게 만들기

const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  // console.log(window.scrollY);
  // console.log(`navbarHeight: ${navbarHeight}`);
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

//Handle scrolling when tapping on the navbar menu
//탐색매뉴 눌렀을때 스크룰 처리
const navbarMeun = document.querySelector(".navbar__meun");
navbarMeun.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  // console.log(event.target.dataset.link);
  //자주 사용될 scrollIntoView 함수로 만듦
  // const scrollTo = document.querySelector(link);
  // scrollTo.scrollIntoView({ behavior: "smooth" });
  navbarMeun.classList.remove("open");
  scrollIntoView(link);
});

// Navbar taggle button for small screen
const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {
  navbarMeun.classList.toggle("open");
});

//Handle click on "contact me" button home

const homeContactBtn = document.querySelector(".home__contact");
homeContactBtn.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  //1 은 불투명
  // 처음 시작 ex.  (1 - 0 / 800 ) = 1
  // 스크롤 반 내려옴 (1 - 400 / 800 ) = 0.5
  // 스크롤 다 내려옴 (1 - 800 / 800 ) = 0
  // 스크롤 더 내려감 (1 - 1600 / 800 ) = -1
  // console.log(1 - window.scrollY / homeHeight);
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show "arrow up" button when scrolling down
const arrowUp = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUp.classList.add("visible");
  } else {
    arrowUp.classList.remove("visible");
  }
});

//Handle click on the "arrow up" button
arrowUp.addEventListener("click", () => {
  scrollIntoView("#home");
});

//Projects
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
//각각의 projects 배열로 받아오려고 전부 받아옴
const projects = document.querySelectorAll(".project");
workBtnContainer.addEventListener("click", (e) => {
  // <span>으로 되어있는 곳 데이터 Undefined. filter에 데이터 없으면
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  // console.log(filter);
  if (filter == null) {
    return;
  }

  // Remove selection from the previous item and select the new one
  const active = document.querySelector(".category__btn.selected");
  active.classList.remove("selected");
  // nodeName이 BUTTON이면 그대로 e.target 사용 아닐경우(<span>일경우) parentNode(버튼임) 사용함.
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  target.classList.add("selected");

  projectContainer.classList.add("anim-out");
  setTimeout(() => {
    projects.forEach((project) => {
      // console.log(project);
      // console.log(project.dataset.type);
      if (filter === "*" || filter === project.dataset.type) {
        // Html에서는 보여지고 클릭했을 때만 안보여지게
        //filter가 맞으면 안보여지는 class를 빼고 만약 filer가 동일하지 않으면
        //안보여져야 되니까 안보여져야 되는 class를 등록 해준다.
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
      // anim-out이 클릭되면 계속 anim-out이 된 상태로 남아 있기 때문에 CSS에 적용한 opacity(불투명)
      // 이 남아 있음. 일정 시간 지난 다음에는 클래스의 anim-out 없애줘야함
      // Timeout이 되면 우리가 등록한 함수를 불러줘, 그리고 300ms 뒤에(0.3초) 우리 함수를 불러줘
      // 0.3초가 지나면 anim-out 없애줌 => opacity가 1로 돌아올 수 있도록
    });
    projectContainer.classList.remove("anim-out");
  }, 300);

  //  console.log("================조금 더 간단==================");
  //  for (let project of projects) {
  //    console.log(project); // }

  //  console.log("=================학원방식=================");
  // let project;
  // for (let i = 0; i < projects.length; i++) {
  //   project = projects[i];
  //   console.log(project);
  // }

  //모든 코드는 동기적 처리, class에서 animation 추가하자 마자 모든 project DOM Element에 필요없는 프로젝트
  //필터링한 다음에 이 코드가 완료되면 브라우저에서 업데이트 되기 때문  => 약간 민망한 애니메이션 만들어짐.
  //anim-out이 된 다음(보여진 다음)에 필터링된 아이들이 적용되게 해야됨.
  //anim-out이 0.3초가 지났을때 그때 필터링을 해서 다시 anim-out을 없애주는 코드.
  //anim-out class 추가후 코드는 끝이남(setTimeout이 전달한 함수는 0.3초 이후에 브라우저로 부터 호출됨.
  //(setTimeout은 브라우저가 제공하는 API이기 때문에)브라우저야 우리 코드를 0.3초 이후에 실행해줘 라고 전달만 해놓고 블럭을 끝냄)
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: "smooth" });
}
