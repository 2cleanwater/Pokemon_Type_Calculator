import jsonData from "./pokemonTable.json" assert { type: "json" }

let selected_Defense_Type = [];
let selected_Attack_Type = [];
let counterDefendTypes= {"2.56":[],"1.6":[],"1":[],"0.625":[]};
let counterAttackTypes= {"2.56":[],"1.6":[],"1":[],"0.625":[]};

function setImages(new_tableTag, TypeNameArray){
  new_tableTag.innerHTML= ""
  for (const TypeName of TypeNameArray) {
    const imgTag = document.createElement("img");
    imgTag.src = `./images/${TypeName}.svg`;
    imgTag.width = 40;
    imgTag.height = 40;
    new_tableTag.appendChild(imgTag);
  }
}

function showTypes(){
  // 선택한 타입 이미지
  let attackTypeDom= document.getElementById("selectedAttackType");
  let defendTypeDom= document.getElementById("selectedDefendType");

  let counterDefendType_Dom_256= document.getElementById("2.56_DefendType");
  let counterDefendType_Dom_16= document.getElementById("1.6_DefendType");
  let counterAttackType_Dom_256= document.getElementById("2.56_AttackType");
  let counterAttackType_Dom_16= document.getElementById("1.6_AttackType");
  
  setImages(attackTypeDom, selected_Attack_Type);
  setImages(defendTypeDom, selected_Defense_Type);
  setImages(counterDefendType_Dom_256, counterDefendTypes[2.56]);
  setImages(counterDefendType_Dom_16, counterDefendTypes[1.6]);
  setImages(counterAttackType_Dom_256, counterAttackTypes[2.56]);
  setImages(counterAttackType_Dom_16, counterAttackTypes[1.6]);
}

/** 공격 타입 선택 */
function selectAttack(type){
  let selectedElement= document.getElementById(type+"AttackType");
  if(selected_Attack_Type.includes(type)){
    selected_Attack_Type= selected_Attack_Type.filter(element=>element!=type);
    selectedElement.classList.remove("selected")
  }
  else{
    if (selected_Attack_Type.length>=2) {
      return
    }
    else{
      selected_Attack_Type.push(type);
      selectedElement.classList.add("selected")
    }
  }
  bestType();
  showTypes();
  
}

/** 방어 타입 선택 */
function selectDefend(type){
  let selectedElement= document.getElementById(type+"DefendType");
  if(selected_Defense_Type.includes(type)){
    selected_Defense_Type= selected_Defense_Type.filter(element=>element!=type);
    selectedElement.classList.remove("selected")
  }
  else{
    if (selected_Defense_Type.length>=2) {
      return
    }
    else{
      selected_Defense_Type.push(type);
      selectedElement.classList.add("selected")
    }
  }
  bestType();
  showTypes();
}

/** 타입 추천 */
function bestType(){
  counterDefendTypes= {"2.56":[],"1.6":[],"1":[],"0.625":[]};
  counterAttackTypes= {"2.56":[],"1.6":[],"1":[],"0.625":[]};

  // 공격타입 체크
  if(selected_Attack_Type.length>0){
    for(let i=0;i<selected_Attack_Type.length;i++){
      let attackTypeData= jsonData[selected_Attack_Type[i]]
      for(let keys in attackTypeData){
        if(attackTypeData[keys]==3) {
          // 약점*약점 => 2.56
          if(counterAttackTypes[1.6].includes(keys)) {counterAttackTypes[1.6]= counterAttackTypes[1.6].filter(i=>i!=keys); counterAttackTypes[2.56].push(keys);}
          // 약점*보통 => 1.6
          else if(counterAttackTypes[1].includes(keys)) {counterAttackTypes[1]= counterAttackTypes[1].filter(i=>i!=keys); counterAttackTypes[1.6].push(keys); }
          // 약점*저항 => 1
          else if(counterAttackTypes[0.625].includes(keys)) {counterAttackTypes[0.625]= counterAttackTypes[0.625].filter(i=>i!=keys); counterAttackTypes[1].push(keys); }
          else counterAttackTypes[1.6].push(keys)
        }
        if(attackTypeData[keys]==2) {
          // 보통*약점 => 1.6
          if(counterAttackTypes[1.6].includes(keys)) {counterAttackTypes[1.6]= counterAttackTypes[1.6].filter(i=>i!=keys); counterAttackTypes[1.6].push(keys); }
          // 보통*보통 => 1
          else if(counterAttackTypes[1].includes(keys)) {counterAttackTypes[1]= counterAttackTypes[1].filter(i=>i!=keys); counterAttackTypes[1].push(keys); }
          // 보통*저항 => 0.625
          else if(counterAttackTypes[0.625].includes(keys)) {counterAttackTypes[0.625]= counterAttackTypes[0.625].filter(i=>i!=keys); counterAttackTypes[0.625].push(keys); }
          else counterAttackTypes[1].push(keys)
        }
        if(attackTypeData[keys]<=1) {
          // 저항*약점 => 1
          if(counterAttackTypes[1.6].includes(keys)) {counterAttackTypes[1.6]= counterAttackTypes[1.6].filter(i=>i!=keys); counterAttackTypes[1].push(keys); }
          // 저항*보통 => 0.625
          else if(counterAttackTypes[1].includes(keys)) {counterAttackTypes[1]= counterAttackTypes[1].filter(i=>i!=keys); counterAttackTypes[0.625].push(keys); }
          // 저항*저항 => 0.625
          else if(counterAttackTypes[0.625].includes(keys)) {counterAttackTypes[0.625]= counterAttackTypes[0.625].filter(i=>i!=keys); counterAttackTypes[0.625].push(keys); }
          else counterAttackTypes[0.625].push(keys)
        }
      }
    }
  }

  // 방어타입 체크
  if(selected_Defense_Type.length>0){
    for(let i=0;i<selected_Defense_Type.length;i++){
      
      // 방어 json생성

      // 새로운 JSON 객체를 만들기 위한 빈 객체 생성
      const defendTypeData = {};

      // 각 속성별로 "Normal" 키의 값을 새로운 객체에 추가
      for (const key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
          const typeValue = jsonData[key][selected_Defense_Type[i]];
          defendTypeData[key] = typeValue;
        }
      }
      for(let keys in defendTypeData){
        if(defendTypeData[keys]==3) {
          // 약점*약점 => 2.56
          if(counterDefendTypes[1.6].includes(keys)) {counterDefendTypes[1.6]= counterDefendTypes[1.6].filter(i=>i!=keys); counterDefendTypes[2.56].push(keys);}
          // 약점*보통 => 1.6
          else if(counterDefendTypes[1].includes(keys)) {counterDefendTypes[1]= counterDefendTypes[1].filter(i=>i!=keys); counterDefendTypes[1.6].push(keys); }
          // 약점*저항 => 1
          else if(counterDefendTypes[0.625].includes(keys)) {counterDefendTypes[0.625]= counterDefendTypes[0.625].filter(i=>i!=keys); counterDefendTypes[1].push(keys); }
          else counterDefendTypes[1.6].push(keys)
        }
        if(defendTypeData[keys]==2) {
          // 보통*약점 => 1.6
          if(counterDefendTypes[1.6].includes(keys)) {counterDefendTypes[1.6]= counterDefendTypes[1.6].filter(i=>i!=keys); counterDefendTypes[1.6].push(keys); }
          // 보통*보통 => 1
          else if(counterDefendTypes[1].includes(keys)) {counterDefendTypes[1]= counterDefendTypes[1].filter(i=>i!=keys); counterDefendTypes[1].push(keys); }
          // 보통*저항 => 0.625
          else if(counterDefendTypes[0.625].includes(keys)) {counterDefendTypes[0.625]= counterDefendTypes[0.625].filter(i=>i!=keys); counterDefendTypes[0.625].push(keys); }
          else counterDefendTypes[1].push(keys)
        }
        if(defendTypeData[keys]<=1) {
          // 저항*약점 => 1
          if(counterDefendTypes[1.6].includes(keys)) {counterDefendTypes[1.6]= counterDefendTypes[1.6].filter(i=>i!=keys); counterDefendTypes[1].push(keys); }
          // 저항*보통 => 0.625
          else if(counterDefendTypes[1].includes(keys)) {counterDefendTypes[1]= counterDefendTypes[1].filter(i=>i!=keys); counterDefendTypes[0.625].push(keys); }
          // 저항*저항 => 0.625
          else if(counterDefendTypes[0.625].includes(keys)) {counterDefendTypes[0.625]= counterDefendTypes[0.625].filter(i=>i!=keys); counterDefendTypes[0.625].push(keys); }
          else counterDefendTypes[0.625].push(keys)
        }
      }
    }
  }
  }


/** 테이블 헤드 작성해주는 함수 */
function create_Defend(TypeName){
  let tableId = document.getElementById('typesTableHead');
  let new_tableTag = document.createElement('td');
  new_tableTag.setAttribute("id", TypeName+"DefendType");
  new_tableTag.setAttribute("class", "DefendIcon")
  //이미지 추가
  //라디오버튼 추가 (버튼 중복 클릭)
  new_tableTag.innerHTML = `<img src="./images/${TypeName}.svg" width=40, height=40>`;
  new_tableTag.onclick= ()=>{selectDefend(TypeName)};
  tableId.appendChild(new_tableTag);
}

function create_Attack(TypeName){
  let tableId = document.getElementById('typesTableBody');
  let new_tableTag = document.createElement('tr');
  new_tableTag.setAttribute("class", "attackType");
  new_tableTag.setAttribute("id", TypeName+"Attack");
  
  //이미지 추가
  //라디오버튼 추가 (버튼 중복 클릭)
  // new_tableTag.innerHTML = TypeName;
  tableId.appendChild(new_tableTag);

  let multipleTableId= document.getElementById(TypeName+'Attack');

  //공격 타입 메뉴
  let new_attackTypeTag= document.createElement('td');
  new_attackTypeTag.setAttribute("class", "AttackIcon");
  new_attackTypeTag.setAttribute("id", TypeName+"AttackType")
  new_attackTypeTag.innerHTML = `<img src="./images/${TypeName}.svg" width=40, height=40>`;
  new_attackTypeTag.onclick= ()=>{selectAttack(TypeName)};
  multipleTableId.appendChild(new_attackTypeTag);

  let typeNameData = jsonData[TypeName];
  Object.keys(typeNameData).forEach(
    (element)=>
    {
      let new_multipleTag= document.createElement('td');
      new_multipleTag.setAttribute("class", "multipleByTypes");
      new_multipleTag.innerHTML = changeMultiple(typeNameData[element]);
      multipleTableId.appendChild(new_multipleTag);
    }
  )
}

function changeMultiple(i){
  // 추후 이미지로 변경?
  if(i==0) return "X" //0.39
  if(i==1) return "△" //0.625
  if(i==2) return "○" //1
  if(i==3) return "◎" //1.6
}
function hey(){
  for(let key in jsonData){
    console.log(key)
    console.log(
      `{"Normal":${jsonData[key][0]}, "Fire":${jsonData[key][1]}, "Water":${jsonData[key][2]}, "Grass":${jsonData[key][3]}, "Electric":${jsonData[key][4]}, "Ice":${jsonData[key][5]}, "Fighting":${jsonData[key][6]}, "Poison":${jsonData[key][7]}, "Ground":${jsonData[key][8]}, "Flying":${jsonData[key][9]}, "Psychic":${jsonData[key][10]}, "Bug":${jsonData[key][11]}, "Rock":${jsonData[key][12]}, "Ghost":${jsonData[key][13]}, "Dragon":${jsonData[key][14]}, "Dark":${jsonData[key][15]}, "Steel":${jsonData[key][16]}, "Fairy":${jsonData[key][17]}}`
    )
    };
}


Object.keys(jsonData).forEach(element => {
  create_Defend(element)
  create_Attack(element)
  //hey();
});

// showTypes();
// console.log(selected_Attack_Type)

