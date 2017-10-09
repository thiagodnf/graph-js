<?php 

	if(isset($_FILES["file"])){

		if ($_FILES["file"]["error"] > 0){
	  		echo "Error: " . $_FILES["file"]["error"] . "<br />";
	  	}else{
	  		
	  		$file = $_FILES["file"]["tmp_name"];
	 		$handle = fopen($file,"r");
	
			// Le TODO o conteudo de um arquivo e armazena em uma variavel		
	  		while ($linha = fgets($handle,1024)){
				echo $linha;
			}
			
			fclose($handle); 
	  	}
	}else{	
		
		//	Usado para salvar em arquivo txt
		
		if(!isset($_POST["textAreaNovoGrafo"])){
			echo "acesso inválido";
			die();	
		}
		
		$grafo = $_POST["textAreaNovoGrafo"];
		
		$temp = tmpfile();
	  
	  	header ("Content-Type: application/download");
		header ("Content-Disposition: attachment; filename=\"grafo.txt\"");

		fwrite($temp, $grafo);
		
		fseek($temp, 0);
		echo fread($temp, strlen($grafo));
		fclose($temp); // this removes the file
		
	}

?>