function AsynchronousGetSender(table, url){
    var self = this;
    this.table = table;
    this.iteration = 0;
    this.total = table.length;

    this.url = url;
    this.type = "json";

    this.DuringAction = function(){
      console.log("Response number: "+self.iteration);
    }

    this.FinishedAction = function(){
      console.log("Finished all!");
    }

    this.SendNext = function(){
      if(self.iteration < self.total-1){
        self.DuringAction();
        self.iteration++;
        self.SendData();
      }
    }

    this.IsFinished = function(){
      if(self.iteration == self.total){
        self.FinishedAction();
      }
    }

    this.SendData = function(){
        $.ajax({
            type: "GET",
            url: self.url,
            async: "true",
            dataType: self.type,
            data:{
                data: self.table[self.iteration]
            },
            success:function(data){},
            complete: function(data){
                console.log("Parsed "+(self.iteration+1)+"/"+self.total);
                self.SendNext();
                self.IsFinished();
            }
        });
    }
}
