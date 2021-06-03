const initialState = [
    {id:1, label:'Buy potato', checked:true},
    {id:2, label:'Buy cheese', checked:false},
    {id:3, label:'Buy milk', checked:true},
    {id:4, label:'Buy gun', checked:false}
];

const reducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return state;
    }
}

export default reducer;