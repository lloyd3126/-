var vm = new Vue({
  el: '#app',
  data: {
    iNeed : '', //1\n2\n3\n
    iDontNeed : '', //4\n5\n6\n
    heNeed : '', //4\n
    heDontNeed : '', //1\n2\n
    copiedStatus : true,
    copiedText : '',
    isClicked : false,
    canChangeOrNot : true
  },methods: {
    copytext : (e)=>{
      var inp = document.createElement('input');
      document.body.appendChild(inp);
      inp.value = e.target.textContent
      vm.copiedText = e.target.textContent
      vm.isClicked = true
      inp.select();
      document.execCommand('copy',false);
      inp.remove();
    }
  },computed: {
    messages : (now)=>{
      now.canChangeOrNot = true
      now.isClicked = false
      let returnMessageArray = [];
      let iNeed = now.iNeed.split('\n').filter(function(item, index, array){
        return item !== ''; 
      });
      let iDontNeed = now.iDontNeed.split('\n').filter(function(item, index, array){
        return item !== ''; 
      });;
      let heNeed = now.heNeed.split('\n').filter(function(item, index, array){
        return item !== ''; 
      });;
      let heDontNeed = now.heDontNeed.split('\n').filter(function(item, index, array){
        return item !== ''; 
      });
      if(iNeed.length !== 0 && iDontNeed.length !== 0 && heNeed.length !== 0 && heDontNeed.length !== 0){
        let youGive = []
        let iGive = []
        iNeed.forEach(mineElement => {
          heDontNeed.forEach(hisElement => {
            if (mineElement == hisElement){
              youGive.push(mineElement)
            }
          });
        });
        iDontNeed.forEach(mineElement => {
          heNeed.forEach(hisElement => {
            if (mineElement == hisElement){
              iGive.push(mineElement)
            }
          });
        });
        iGive.forEach(mineElement => {
          youGive.forEach(hisElement => {
            returnMessageArray.push('我用「' + mineElement + '」交換「' + hisElement+ '」')
          });
        });
        // now.canChangeOrNot = true
        if(returnMessageArray.length == 0){
          now.canChangeOrNot = false
        }
      }
      return returnMessageArray
    }
  }
})