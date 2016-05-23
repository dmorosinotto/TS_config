export default `
<b class="bg-info">HTML Q:</b> {{$ctrl.question}} ? <input ng-model="$ctrl.response">
<button class="btn btn-primary" ng-click="$ctrl.answer()">Answer</button>
`