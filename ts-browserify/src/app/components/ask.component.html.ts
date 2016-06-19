export default ` 
<b class="bg-info">HTML Q:</b> {{$ctrl.question}} ? <input ng-model="$ctrl.response">
<button class="btn btn-primary" ng-click="$ctrl.answer()">Answer</button>
` //THIS IS A TRICK TO HAVE SEPARETE HTML INTO A "FAKE" MODULE JS TO EDIT HTML SIMPY REMOVE 1st LINE