<template>
    <div id="MainHome">
  
      <!-- Header -->
      <h1>My News Feed</h1>
  
      <!-- select 박스 -->
      <select id="newsCategory" v-model="selectedCategory">
          <option value="general">general</option>
          <option value="technology">technology</option>
          <option value="health">health</option>
          <option value="science">science</option>
      </select>
  
      <!-- news contents -->
      <div id="newsBox" style="height: 800px;">
  
        <!-- article title -->
          <ul :v-if="articles.length">
              <li v-for="(article, index) in articles" :key="index">
                  <a :href=article.url target="_blank">
                      {{ article.title }}<br>
                      <small>By: {{ article.author || 'Unknown' }}</small>
                  </a>
              </li>
          </ul>
  
      </div>
  
      <div>
  
          <!-- 이전 페이지 버튼 -->
          <button 
              class="pagination" 
              style="margin-right: 10px;"
              @click="goToPrevPage()"
          >
              &lt;&lt;
          </button>
  
          <!-- 숫자 페이지 버튼 -->
          <button 
              class="pagination"
              v-for="i in totalArticlePage" :key="i" 
              :class="{ selected : i === currentPageNum }"
              @click="goToPage(i)"
          >
              {{ i }}
          </button>
  
          <!-- 다음 페이지 버튼 -->
          <button
              class="pagination"
              style="margin-left: 10px;"
              @click="goToNextPage()"
          >
              &gt;&gt;
          </button>
  
      </div>
    </div>
</template>
  
<script>
  
export default {
    name: 'MainHome',

    data() {
        return {
            selectedCategory: 'general',                   // 초기 select박스의 값 설정
            articles: [],                                  // api 요청으로 가져온 articles를 담을 배열
            newsApiKey : process.env.VUE_APP_NEWS_API_KEY, // .env에 저장한 api key값을 불러온다.
            totalArticlePage: 1, // 총 페이지 수를 저장할 변수
            currentPageNum: 1,   // 현재 페이지의 번호를 저장할 변수
            pageSize: 10,        // 한 페이지에 저장할 article의 개수
        };
    }, // data()-end
    
    methods: {

        //getArticles() 함수 내부에서 $axios.get에 필요한 url
        getURL() {

            const endpoint = 'https://newsapi.org/v2/top-headlines?';
            const country = 'us';
            const category = this.selectedCategory;
            const currentPageNum = this.currentPageNum;
            const pageSize = this.pageSize;
            const apikey = this.newsApiKey;
            return `${endpoint}country=${country}&category=${category}&page=${currentPageNum}&pageSize=${pageSize}&apikey=${apikey}`;

        }, // getURL()-end
  
        // API 요청을 보내고 데이터를 articles에 저장.
        async getArticles() {

            try {
                const res = await this.$axios.get(this.getURL());
                this.totalArticlePage = Math.ceil(res.data.totalResults / this.pageSize);
                this.articles = res.data.articles;
  
            } catch (error) {
                console.error("There was an error fetching the data!", error);
            } finally {
                console.log("getArticles()의 try~catch~finally가 실행됨");
            } // try~catch~finally()-end

        }, // getArticles()-end
  
        // 숫자 페이지 버튼
        goToPage(currentPageNum) {
            this.currentPageNum = currentPageNum;
            this.getArticles();
        },
  
        // 이전 페이지 버튼
        goToPrevPage() {
            --this.currentPageNum;
            this.getArticles();
        },
  
        // 다음 페이지  버튼
        goToNextPage() {
            ++this.currentPageNum;
            this.getArticles();
        },
  
    }, // methods()-end
  
    watch: {
        // 카테고리가 변경되면 기존의 페이지 수도 1로 초기화
        selectedCategory() {
            this.currentPageNum = 1;
            this.getArticles();
        }
    },


    created() {
        this.getArticles();
    },

};

</script>
  
<style>
    h1 {
        margin: 50px auto;
    }
    li {
        list-style-type: none;
        margin: 30px;
        font-weight: bold;
        color: black;
        font-size: 20px;
    }
    a {
        text-decoration: none;
        color: black; 
        opacity: 0.8;
    }
    a:hover {
        text-decoration: underline;
    }    
    .pagination {
        background: white;
        margin-right: 2px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .pagination:hover {
        background: lightgray;
    }
    .pagination:active {
        background: gray;
    }
    .pagination.selected {
        background: #007bff;
        color: white;
    }
    #newsCategory {
        background-size: 20px;
        padding: 5px 30px 5px 10px;
        border-radius: 4px;
        outline: 0 none;
        font-weight: bold;
    }
    .select option {
        background: black;
        color: #fff;
        padding: 3px 0;
    }
</style>