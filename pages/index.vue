<template>
    <div class="container my-12">
        <h1 class="text-center mb-12">Gerenciador de Tarefas</h1>
        <div class="row justify-content-between">
            <div class="col-12">
                Bem-vindo! Aqui você pode gerenciar suas tarefas com facilidade.
                <button @click="$router.push(`/tasks`)" class="btn btn-primary float-end">Cadastrar</button>
            </div>
        </div>

        <!-- Lista de tarefas -->
        <TaskList />
    </div>
</template>
  
  <script setup>
  import TaskList from '~/components/tasks/TaskList.vue';
  </script>
  
  <style scoped>
  /* Estilos opcionais */
  h1 {
    color: #007bff;
  }
  </style>
  