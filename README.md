# OCR-for-Inbody-Record

---
### Project Rule
* #### Issue 규칙
  1. 기능 별 하나의 issue를 생성한다.
  2. 이슈 생성 시 프로젝트 인원이 모두 참여한 상태에서 생성한다.


* #### Commit 메세지

  1. add 시 commit이 적용되는 파일만 적용한다.
  2. 첫 글자는 대문자로 한다.
  3. 마지막에 . 은 제외한다. 
  4. 제목은 영어로 작성하되 내용은 한글로 작성해도 무방하다.

    * ###### Commit message structure
      ```
      $ <header>: <subject> -- 헤더 
        <BLANK LINE> -- 빈 줄 
        <body> -- 본문 
        <BLANK LINE> -- 빈 줄 
        <footer> -- 꼬리말(생략가능)
      ```
    * ###### \<header>/\<footer>
      ```
      feat : 새로운 기능에 대한 커밋 
      fix : build 빌드 관련 파일 수정에 대한 커밋 
      build : 빌드 관련 파일 수정에 대한 커밋 chore : 그 외 자잘한 수정에 대한 커밋(rlxk qusrud) 
      ci : CI 관련 설정 수정에 대한 커밋 
      docs : 문서 수정에 대한 커밋 
      style : 코드 스타일 혹은 포맷 등에 관한 커밋 
      refactor : 코드 리팩토링에 대한 커밋 
      test : 테스트 코드 수정에 대한 커밋
      close : 이슈 종료에 대한 꼬리말
      ```
    * ###### Example
      ```
      Feat: dataloader function(#12)

      데이터를 불러오는 기능 추가

      Close: #12
      ```


* #### Branch 이름
  1. 모든 브랜치는 dev에서 파생한다.
  2. {workflow}/#{issue index}로 모두 소문자로 구성한다.
  3. workflow에는 feature/hotfix를 사용한다.
  4. feature:새로운 기능 추가
  5. hotfix:버그 발생 시 수정
  6. ex) feature/#12 or hotfix/#13


* #### Merge 규칙
  1. Merge 시 dev로 PR을 하며 Assignees에는 프로젝트에 참가하는 모든 인원을 포함한다.

* #### Coding Style
  1. PEP8 스타일을 따른다.

* #### 버전 표기 기준
  1. [X.Y.Z / 주.부.수] 로 표기한다.
  1.1. 기존 버전과 호환되지 않게 API가 바뀌면 “주(主) 버전”을 올리고,
  1.2. 기존 버전과 호환되면서 새로운 기능을 추가할 때는 “부(部) 버전”을 올리고,
  1.3. 기존 버전과 호환되면서 버그를 수정한 것이라면 “수(修) 버전”을 올린다.
---
### Project Pre-commit Setting
1. 본 프로젝트는 pipenv 환경을 기반으로 구성된다.
2. python3.8 버전을 base로 구성한다.
3. 이외의 라이브러리는 Pipfile을 참고한다.
* #### Install pre-commit
    .pre-commit-config.yaml 파일에 기본적으로 구성
    
    ```
    #pip install pre-commit
    #pre-commit install
    ```


---
