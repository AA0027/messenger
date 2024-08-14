export const getDept = (dept) =>{
    let data;
    switch(dept){
        case "Tech01":
            data = "기술1팀";
            break;
        case "Tech02":
            data = "기술2팀";
            break;
        case "Tech03":
            data = "기술3팀";
            break;
        case "QA":
            data = "QA팀";
            break;
        default:
            break;
    }
    return data;
};

export const getPos = (pos) => {
    let data;
    switch(pos){
        case "INTERN":
            data = "인턴";
            break;
        case "STAFF":
            data = "사원";
            break;
        case "Supervisor":
            data = "주임";
            break;
        case "Assistant_Manager":
            data = "대리";
            break;
        case "Manager":
            data = "과장";
            break;
        case "Director":
            data = "부장";
            break;
        default:
            break;
    }
    return data;
}