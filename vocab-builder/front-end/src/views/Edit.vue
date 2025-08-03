<template>
  <div>
    <h1>Edit Word</h1>
    <word-form @createOrUpdate="createOrUpdate" :word=this.word></word-form>
  </div>
</template>

<script>
import WordForm from '../components/WordForm.vue';
import { api } from '../helpers/helpers';

export default {
  name: 'edit',
  components: {
    'word-form': WordForm
  },
  data: function () {
    return {
      word: {}
    };
  },
  async mounted() {
    this.word = await api.getWord(this.$route.params.id);
    this.oriWord = {...this.word};
  },
  methods: {
    createOrUpdate: async function (word) {
      if(
        word.english === this.oriWord.english &&
        word.german === this.oriWord.german &&
        word.japanese === this.oriWord.japanese 
      ){
        this.flash('Please change something!!','error')
      }
      else{
        await api.updateWord(word);
        this.flash('Word updated successfully!', 'success');
        this.$router.push(`/words/${word._id}`);
      }
    }
  }
};
</script>
