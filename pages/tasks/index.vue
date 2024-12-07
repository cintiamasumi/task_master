<template>
  <div class="container my-12 tasks-create">
    <h1>Criar Tarefa</h1>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="title">Título</label>
        <input type="text" id="title" v-model="task.title" :class="['form-control', isTitleValid ? '' : 'is-invalid']" @blur="validateTitle" />
      </div>
      <div class="mb-3">
        <label for="description">Descrição</label>
        <textarea id="description" v-model="task.description" :class="['form-control', isDescriptionValid ? '' : 'is-invalid']" @blur="validateDescription"></textarea>
      </div>
      <div class="mb-3">
        <label for="due_date">Data de Vencimento</label>
        <input type="text" id="due_date" v-model="dueDate" :class="['form-control', isDueDateValid ? '' : 'is-invalid']" @input="formatDueDate" placeholder="dd/mm/aaaa" />
      </div>
      <div class="mb-3 tasks-create__buttons">
        <button type="button" @click="$router.push(`/`)" class="btn btn-outline-secondary">Voltar</button>
        <button type="submit" class="btn btn-primary">Criar Tarefa</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const task = ref({
  title: '',
  description: '',
  status: 'Pendente',
  due_date: ''
});
const dueDate = ref('');
const errorMessage = ref('');
const isDueDateValid = ref(true);
const isTitleValid = ref(true);
const isDescriptionValid = ref(true);

const formatDueDate = () => {
  let rawDate = dueDate.value.replace(/\D/g, '');
  if (rawDate.length > 8) {
    rawDate = rawDate.slice(0, 8);
  }
  if (rawDate.length <= 2) {
    dueDate.value = rawDate;
  } else if (rawDate.length <= 4) {
    dueDate.value = `${rawDate.slice(0, 2)}/${rawDate.slice(2)}`;
  } else {
    dueDate.value = `${rawDate.slice(0, 2)}/${rawDate.slice(2, 4)}/${rawDate.slice(4)}`;
  }

  validateDueDate();
};

const validateDueDate = () => {
  const dateParts = dueDate.value.split('/');
  if (dateParts.length === 3) {
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Month is zero-based in JavaScript Date
    const year = parseInt(dateParts[2], 10);
    const date = new Date(year, month, day);
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month ||
      date.getDate() !== day
    ) {
      isDueDateValid.value = false;
    } else {
      isDueDateValid.value = true;
    }
  } else {
    isDueDateValid.value = false;
  }
};

const validateTitle = () => {
  isTitleValid.value = task.value.title.trim() !== '';
};

const validateDescription = () => {
  isDescriptionValid.value = task.value.description.trim() !== '';
};

const validateForm = () => {
  validateTitle();
  validateDescription();
  validateDueDate();
  return isTitleValid.value && isDescriptionValid.value && isDueDateValid.value;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    errorMessage.value = 'Por favor, preencha todos os campos corretamente.';
    return;
  }
  const payload = {
    title: task.value.title,
    description: task.value.description,
    status: task.value.status,
    due_date: `${dueDate.value.slice(6, 10)}-${dueDate.value.slice(3, 5)}-${dueDate.value.slice(0, 2)}`
  };

  try {
    await axios.post('http://localhost:3000/api/tasks', payload);
    router.push('/');
  } catch (error) {
    console.error('Erro ao salvar tarefa:', error);
    errorMessage.value = 'Erro ao salvar tarefa. Por favor, tente novamente mais tarde.';
  }
};
</script>

<style lang="scss" scoped>
$task-border-color: #ccc;
$task-padding: 10px;
$task-border-radius: 5px;
$gap-size: 10px;

.tasks-create {
  &__buttons {
    display: flex;
    gap: $task-padding;
  }
}

.is-invalid {
  border-color: #dc3545;
}
</style>
