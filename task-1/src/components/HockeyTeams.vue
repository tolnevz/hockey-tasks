<script setup lang="ts">
  import { SortDirection, type Team } from '@/models';
  import { ref, computed } from 'vue';

  const teams = ref<Team[]>([
    { name: 'Спартак', city: 'Москва', points: 110 },
    { name: 'Торпедо', city: 'Нижний Новгород', points: 119 },
    { name: 'СКА', city: 'Санкт-Петербург', points: 122 },
    { name: 'ХК Сочи', city: 'Сочи', points: 115 },
    { name: 'Локомотив', city: 'Ярославль', points: 114 },
    { name: 'Ак Барс', city: 'Казань', points: 109 },
    { name: 'Трактор', city: 'Челябинск', points: 126 },
  ]);

  const filterText = ref<string>('');
  const sortDirection = ref<SortDirection>(SortDirection.DESC);

  const filteredTeams = computed(() => {
    return teams.value.filter(team => team.name.toLowerCase().includes(filterText.value.toLowerCase()));
  });

  const sortedTeams = computed(() => {
    return [...filteredTeams.value].sort((a, b) => (sortDirection.value === SortDirection.ASC ? a.points - b.points : b.points - a.points));
  });

  const topTeam = computed(() => {
    return teams.value.reduce((max, current) => {
      return current.points > max.points ? current : max;
    });
  });

  const onChangeSortDirection = () => {
    sortDirection.value = sortDirection.value === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
  };
</script>

<template>
  <div class="container">
    <h1 class="text-center">Список хоккейных команд</h1>

    <section class="team-list">
      <div class="form-field">
        <label for="filter">Фильтр:</label>
        <input type="text" v-model="filterText" placeholder="Введите название команды" />
      </div>

      <table class="full-width">
        <thead>
          <tr>
            <th>Название</th>
            <th>Город</th>
            <th class="cursor-pointer" @click="onChangeSortDirection">
              Очки <span>{{ sortDirection === SortDirection.DESC ? '↑' : '↓' }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="filteredTeams.length === 0">
            <tr><td colspan="3" class="text-center">Ничего не нашлось</td></tr>
          </template>
          <tr v-for="team in sortedTeams" :key="team.name" :class="{ highlight: team === topTeam }">
            <td>{{ team.name }}</td>
            <td>{{ team.city }}</td>
            <td>{{ team.points }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<style scoped>
  .team-list {
    margin-top: 20px;
    width: 100%;
  }
</style>
