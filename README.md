# NgCssAnimator
  A simple Angular Directive to trigger animation from <a href="http://daneden.github.io/animate.css/">animation.css </a> via various ways based on the attributes given in tag.Very simple to use and easy to implement.All you need is to add ngcssanimator in your app and add the directive in the html elements which you want to animate 

  For More detatils Please visit <a href="http://hrhrprasath.github.io/NgCssAnimate/"> http://hrhrprasath.github.io/NgCssAnimate/</a>
Usage
=======
  Make sure to load AngularJS first, and then `NgCssAnimate.min.js`.

  The module is named `ngcssanimate`. To enable it, you must simply list it as a dependency in your app. Example:

    var app = angular.module('app', ['ngcssanimate', ...]);

  Add the following attributes in the required html element you want to animate as per your need<br>

&emsp;1)<b>ani</b>: to inject the directive into the element<br>
&emsp;2)<b>ani-class </b>: the animation css class name which will be triggered [onload by default]<br>
&emsp;3)<b>ani-delay-start </b>: Timeout after which the animation is triggered<br>
&emsp;4)<b>ani-additional-class </b>:  more css class which need to be added with the animation eg:"infinity" mainly useful to modify timings<br>
&emsp;5)<b>ani-event </b>: Event name on which the animation is to be triggered eg:"click" means trigger animation on click <br>
&emsp;6)<b>ani-event-once ="true" </b>:  means animation will be triggered only once<br>
&emsp;7)<b>ani-trigger-element-id="btn1" ani-trigger-element-event="click"</b> :  attributes which can be used to trigger animation based on other element activation <br>
&emsp;8)<b>ani-trigger-once="true"</b> : trigger animation based on other element activity only once<br>
&emsp;9)<b>ani-scope-class-var="animationclass" </b>: name of the scope variable which represents the animation css class.Animation is triggered whenever the value to the scope variable changes if other events or trigger elements <br>
&emsp;10)<b>ani-on-dom-scroll="true"</b> :  trigger's animation on scroll once the element is visible <br>

<b>*If you are not using animate.css just pass your css class name's</b>

<br>
Released under <a href="http://github.com/hrhrprasath/NgCssAnimate/blob/master/LICENSE.txt">MIT licence</a> 
