<template>
  <div id="glav" class="container-fluid">
    <div class="row">
      <div class="col-sm-4 col-md-3 text-whit">
        <img class="bs-height-img" src="@/assets/image/pic1.png" alt />
      </div>
      <div class="col-sm-8 col-md-9 bg-white">
        <div class="row align-items-center justify-content-start h-100">
          <div style="width: 100%;">
            <p class="text-dark text-center bs-p-link">Войти в личный кабинет</p>
            <label class="text-dark bs-p-label" for="log">Логин</label>
            <br />
            <input
              class="bs-input-log"
              style="margin-bottom: 45px;"
              id="log"
              type="text"
              placeholder="Введите логин"
            />
            <br />
            <label class="text-dark bs-p-label" for="pass">Пароль</label>
            <br />
            <input
              class="bs-input-log"
              style="margin-bottom: 45px;"
              id="pass"
              type="text"
              placeholder="Введите пароль"
            />
            <p class="bs-p-danger">Неверный логин и/или пароль</p>
            <button id="autor" class="bs-button-log">ОК</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>