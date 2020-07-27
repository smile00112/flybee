<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-4 col-md-3 text-whit">
        <img class="bs-height-img" src="./assets/image/pic1.png" />
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: mapActions(["getDateNow"]),
  mounted() {
    this.getDateNow();
  }
};
</script>

<style>
.nav-item {
  display: flex;
}
.nav-item-date {
  padding: 0 20px;
  display: inline-table;
}
.nav-item-date label{
  padding: 0 10px;
}
.bs-height-img {
  max-height: 1000px;
}
.bs-p-link {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 26px;
  line-height: 30px;
  text-align: center;
  color: #272727;
}
.bs-p-label {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  color: #272727;
  margin-left: 15%;
}
.bs-input-log {
  /*width: 493px;*/
  padding: 2.558% 40.864% 2.558% 4%;
  background: #ffffff;
  border: 1px solid rgba(63, 63, 63, 0.79);
  box-sizing: border-box;
  border-radius: 7px;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}
.bs-p-danger {
  font-family: Roboto;
  font-style: italic;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  color: #ff5c5c;
  text-align: center;
}
.bs-a-ul-zak {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 26px;
  line-height: 30px;
  color: #272727;
}
.bs-button-log {
  /* position: absolute;
  left: 0;
  right: 0;
  width: 113px;
height: 43px;*/
  background: #ffbd3d;
  border: 1px solid rgba(63, 63, 63, 0.79);
  box-sizing: border-box;
  border-radius: 7px;
  padding: 1.43% 6.74186% 1.43% 6.74186%;
  position: relative;
  left: 50%;
  transform: translate(-50%, 0);
}
.active {
  text-decoration: underline #ffbd3d !important;
}
.bs-a-filtr-zak {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 40px;
  text-align: center;
  color: #272727;
}
.bs-input-search-zak {
  width: 465px;
  height: 45px;
  background: #ffffff;
  border: 1px solid rgba(63, 63, 63, 0.79);
  box-sizing: border-box;
  border-radius: 7px;
  padding-left: 20px;
}
.bs-button-search-zak {
  width: 70px;
  height: 45px;
  background: #ffbd3d;
  border: 1px solid rgba(63, 63, 63, 0.79);
  box-sizing: border-box;
  border-radius: 7px;
  margin-left: -3%;
  background-image: url("./assets/image/iconsearch.png");
  background-repeat: no-repeat;
  background-position: center;
}
.bs-nomer-zak {
  width: 90%;
  height: 45px;
  background: #ffffff;
  border: 1px solid rgba(63, 63, 63, 0.79);
  box-sizing: border-box;
  border-radius: 7px;
  display: flex;
  align-items: center;
  padding-left: 20px;
}
.bs-p-zak {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  color: #272727;
  margin: 0 !important;
}
.bs-left-zak {
  margin-left: auto;
  width: 35px;
  height: 35px;
}
.bs-list-zak {
  overflow: auto;
}
.bs-a-filtr-zak:hover {
  cursor: pointer;
}
.bs-filtr-zak {
  position: absolute;
  width: 337px;
  height: 516px;
  left: 1103px;
  top: 234px;
  /* display: none; */
}
.bs-border-hist {
  background: #ffffff;
  border: 4px solid #ffbd3d;
  box-sizing: border-box;
  border-radius: 3px;
}
.bs-border-hist::-webkit-scrollbar {
  width: 0px;
}
.bs-padding-hist {
  padding-top: 20px;
  padding-left: 25px;
}
.bs-text {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
}
.bs-input-zakaz {
  width: 260px;
  height: 55px;
  background: #ffffff;
  border: 1px solid rgba(63, 63, 63, 0.79);
  box-sizing: border-box;
  border-radius: 7px;
  margin-bottom: 30px;
}
.bs-labe-zakaz {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  color: #272727;
  margin-bottom: 25px;
}
.bs-okey-button {
  background-color: #ffbd3d;
  border: 1px solid rgba(63, 63, 63, 0.5);
  box-sizing: border-box;
  border-radius: 7px;
  width: 200px;
  height: 45px;
  color: #1d1d1d;
}
.bs-success-button {
  background-color: green;
  border: 1px solid rgba(63, 63, 63, 0.5);
  box-sizing: border-box;
  border-radius: 7px;
  width: 200px;
  height: 45px;
  color: #1d1d1d;
  margin-left: 30px;
}
.bs-nope-button {
  width: 200px;
  height: 45px;
  background-color: rgba(255, 92, 81, 0.7);
  border: 1px solid rgba(63, 63, 63, 0.5);
  box-sizing: border-box;
  border-radius: 7px;
  color: #1d1d1d;
  margin: 0px 30px;
}
.bs-input-dop-zakaz {
  width: 260px;
  height: 220px;

  background: #ffffff;
  border: 1px solid rgba(63, 63, 63, 0.79);
  box-sizing: border-box;
  border-radius: 7px;
}
.bs-back-button {
  width: 200px;
  height: 45px;
  background-color: #343a40;
  border: 1px solid rgba(63, 63, 63, 0.5);
  box-sizing: border-box;
  border-radius: 7px;
  color: #ffffff;
}
.bs-m-t-60 {
  margin-top: 60px;
}
.bs-filtr-zak {
  position: absolute;
  width: 340px;
  height: 500px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}
.bs-close {
  position: absolute;
  right: 2%;
  top: 2%;
  border: none;
  background-color: #fff;
}
.bs-filtr-zak {
  padding: 40px 0px 0px 50px;
}
.bs-p-zagl {
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 20px;
}
.bs-list-filtr li {
  margin: 2% 0%;
}
.bs-prim-filtr {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  text-align: center;

  color: #272727;
  margin-top: 5%;
}
.bs-clear-filtr {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 23px;
  text-align: center;

  color: #272727;
  margin-top: 5%;
}
.bs-img-ring {
  width: 28px;
  height: 28px;
}
/* #orders {
  display: none;
} */
/*#inspekt-order
{
    display: none;
}*/
/* #history-orders {
  display: none;
} */
@media (max-width: 1680px) {
  .bs-height-img {
    max-height: 100vh;
  }
}
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
</style>