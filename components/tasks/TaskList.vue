<template>
  <div class="tasks-container">
    <h1>Lista de Tarefas</h1>
    <div v-if="alert.message" :class="['alert', alert.type]" role="alert">
      {{ alert.message }}
    </div>
    <div class="task-content">
      <div v-if="isLoading" class="loading">
        Carregando tarefas...
      </div>
      <div v-else>
        <div v-if="tasks.length === 0" class="no-tasks-message">
          Não existem tarefas cadastradas.
        </div>
        <div v-else v-for="task in tasks" :key="task.id" class="task-item card">
          <div class="card-body">
            <div class="task-item__header">
              <h3>{{ task.title }}</h3>
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" :id="`switch-${task.id}`" :checked="task.status === 'Concluida'" @change="toggleStatus(task)" />
                <label class="form-check-label" :for="`switch-${task.id}`">
                  {{ task.status === 'Concluida' ? 'Concluida' : 'Pendente' }}
                </label>
              </div>
            </div>
            
            <div class="task-item__description">
              {{ task.description }}
            </div>
            <div class="task-item__due-date">
              Data de Vencimento: {{ formatDate(task.due_date) }}
            </div>
            <div class="task-item__buttons">
              <button @click="deleteTask(task.id)" class="btn btn-danger">Deletar</button>
              
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { formatDate } from '../../libs/utils/formatDate';

const tasks = ref([]);
const isLoading = ref(true);
const alert = ref({ message: '', type: '' });

const setAlert = (message, type) => {
  alert.value.message = message;
  alert.value.type = type;
};

const fetchTasks = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/tasks');
    tasks.value = response.data.tasks;
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    setAlert('Erro ao buscar tarefas. Por favor, tente novamente mais tarde.', 'alert-danger');
  } finally {
    isLoading.value = false;
  }
};

const deleteTask = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/api/tasks/${id}`);
    await fetchTasks();
    setAlert('Tarefa apagada com sucesso!', 'alert-success');
  } catch (error) {
    console.error('Erro ao apagar tarefa:', error);
    setAlert('Erro ao apagar tarefa. Por favor, tente novamente mais tarde.', 'alert-danger');
  }
};

const toggleStatus = async (task) => {
  const newStatus = task.status === 'Pendente' ? 'Concluida' : 'Pendente';
  try {
    await axios.put(`http://localhost:3000/api/tasks`, {
      id: task.id,
      status: newStatus
    });
    task.status = newStatus;
    setAlert('Status da tarefa atualizado com sucesso!', 'alert-success');
  } catch (error) {
    console.error('Erro ao atualizar status da tarefa:', error);
    setAlert('Erro ao atualizar status da tarefa. Por favor, tente novamente mais tarde.', 'alert-danger');
  }
};

onMounted(fetchTasks);
</script>

<style lang="scss" scoped>
.tasks-container {
  .loading {
    display: flex;
    justify-content: center;
  }
  .task-content {
    display: flex;
    width: 100%;
    flex-direction: column;
    
    .task-item {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 12px;

      &__header {
        display: flex;
        justify-content: space-between;
      }

      &__buttons {
        margin-top: 12px;
        display: flex;
        gap: 10px;
      }
    }  
  }
}


</style>
