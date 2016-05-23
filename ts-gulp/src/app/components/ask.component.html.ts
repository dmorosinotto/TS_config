export default `
<b>HTML TRICK Q:</b> {{$ctrl.question}} ? <input ng-model="$ctrl.response">
<button ng-click="$ctrl.answer()">Answer</button>
`