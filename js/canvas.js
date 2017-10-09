var width;
var height;
var context;
var canvas;

var originx = 0;
var originy = 0;
var scale = 1;

var option = 0;

var mouseX, mouseY;
var countVertice = 1;

var contadorDeIdsVertices =  1;

var grafo = null;

function Vertice(valor,posX,posY) {	
	this.id = contadorDeIdsVertices++;
	this.valor = this.id;
	if(valor != null) this.valor = valor;	
	this.posX = posX;
	this.posY = posY;
	this.raio = 20;	
	this.fill = '2D2D2D';
	this.fillText = "white";
}

function Aresta(inicio,fim, valor) {	
	this.valor = valor;
	this.inicio = inicio;
	this.fim = fim;		
	this.fill = '#444444';
	this.fillText = "red";
}


function Grafo()
{
	this.verticeSelecionado = null;
	this.arestaSelecionada = null;
	this.vertices = [];
	this.arestas = [];
	
	this.adicionarVertice = function (valor,posX,posY){
		if(!this.search_porValor(valor)){
			var vertice = new Vertice(valor,posX,posY);
			this.vertices.push(vertice);
			this.update();
			return vertice;
		}
		
		return null;
	};
		
	this.adicionarAresta_porValor = function(valorInicio,valorFim,valor){
		var verticeInicio = this.search_porValor(valorInicio);
		var verticeFim = this.search_porValor(valorFim);
		
		if(verticeInicio == null || verticeFim == null){
			alert("Algum dos vértices não existem");
			return;
		}
		
		this.adicionarAresta(verticeInicio.id,verticeFim.id,valor);
	};
	
	this.removerVertice = function(idVertice)
	{
		for (var i in this.vertices){
			if(idVertice == this.vertices[i].id){				
				this.vertices.splice(i,1);
				this.removerArestas(idVertice);
				break;
			}
		}		
	};
	
	this.removerArestas = function(idVertice)
	{
		for (i=0;i< this.arestas.length;i++){
			if(idVertice == this.arestas[i].inicio.id){
				this.arestas.splice(i,1);
				i= 0;
			}
		}	
		for (i=0;i< this.arestas.length;i++){
			if(idVertice == this.arestas[i].fim.id){
				this.arestas.splice(i,1);
				i= 0;
			}
		}	
	};
	
	this.removerAresta = function(aresta)
	{
		for (var i in this.arestas){
			if(aresta == this.arestas[i]){
				this.arestas.splice(i,1);
				break;
			}
		}			
	};
	
	this.salvar = function()
	{
		var dados = "{\"vertices\":[";
		
		for(var i in this.vertices){
			dados += "{\"valor\":\""+this.vertices[i].valor+"\",";				
			dados += "\"posx\":\""+this.vertices[i].posX+"\",";
			dados += "\"posy\":\""+this.vertices[i].posY+"\",";
			dados += "\"raio\":\""+this.vertices[i].raio+"\",";	
			dados += "\"fill\":\""+this.vertices[i].fill+"\",";
			dados += "\"fillText\":\""+this.vertices[i].fillText+"\"";
			
			if(i != this.vertices.length-1)
				dados +="},";			
		}
		dados += "}],";
		
		dados += "\"arestas\":[";
		
		for (var i in this.arestas){
			valorInicio = this.arestas[i].inicio.valor;
			valorFim = this.arestas[i].fim.valor;
			peso = this.arestas[i].valor;
			
			dados += "{\"verticeInicio\":\""+valorInicio+"\",\"verticeFim\":\""+valorFim+"\",\"valor\":\""+peso+"\"}";			
			
			if(i != this.arestas.length-1)
				dados +=",";				
		}
		
		dados += "]}";
		
		$("#textAreaNovoGrafo").val(dados);
		$("#salveForm").submit();
	};
	
	this.adicionarAresta = function(idInicio,idFim,valor){
		var inicio = this.search(idInicio);
		var fim = this.search(idFim);
		
		if(inicio == null || fim == null){
			alert("Algum dos vértices não existem");
			return;
		}
		
		var aresta = new Aresta(inicio,fim,valor);
		this.arestas.push(aresta);
		this.update();
	};
	
	this.setPosX = function(vertice,posX){
		vertice.posX = posX;
	};
	
	this.setPosY = function(vertice,posY){
		vertice.posY = posY;
	};
	
	this.search = function(idVertice){
		for (var i in this.vertices){
			if(idVertice == this.vertices[i].id){
				return this.vertices[i];
			}
		}		
		return null;
	};
	
	this.search_porValor = function(valorVertice){
		for (var i in this.vertices){
			if(valorVertice == this.vertices[i].valor){
				return this.vertices[i];
			}
		}		
		return null;
	};
	
	this.searchAresta = function(verticeInicio,verticeFim)
	{
		for(var i in this.arestas){
			if(this.arestas[i].inicio == verticeInicio && this.arestas[i].fim == verticeFim){
				return this.arestas[i];
			}
		}
		
		return null;
	};
	
	this.verticeClicado = function(posX,posY){
		
		for(var i in grafo.vertices){
			var x = grafo.vertices[i].posX;
			var y = grafo.vertices[i].posY;
			
			if(Math.pow((posX-x),2)+ Math.pow((posY-y),2) <	 400){
				return this.vertices[i];							
			}		
		}	
		
		return null;
	};
	
	this.arestaClicada = function(posX,posY){
		for(var i in this.arestas){
			x1 = this.arestas[i].inicio.posX;
			y1 = this.arestas[i].inicio.posY;
			x2 = this.arestas[i].fim.posX;
			y2 = this.arestas[i].fim.posY;
			
			a = (y2-y1)/(x2-x1);
			b = y2-a*x2;
			
			d = Math.abs((a*posX+(-1)*posY+b))/(Math.sqrt(Math.pow(a,2)+Math.pow(b,2)));
			
			if(d < 0.15){
				return this.arestas[i];
			}			
		}
		
		return null;
	};
	
	this.updateAresta = function()
	{
		for(var i in this.arestas){
			
			context.lineWidth = 2;
			context.beginPath();
			
			fromx = this.arestas[i].inicio.posX;
			fromy = this.arestas[i].inicio.posY;
			
			tox = this.arestas[i].fim.posX;
			toy = this.arestas[i].fim.posY;
			
			var headlen = 10;   // length of head in pixels
		    var angle = Math.atan2(toy-fromy,tox-fromx);
		    
		    //Coloca o centro na circunferência do vertice e não no centro.
		    toy = toy- 20*Math.sin(angle);
		    tox = tox- 20*Math.cos(angle);
		    
		    context.moveTo(fromx, fromy);
		    context.lineTo(tox, toy);
		    
		    if(this.searchAresta(this.arestas[i].fim, this.arestas[i].inicio) == null){
		    	context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
			    context.moveTo(tox, toy);
			    context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
		    }
				//Desenha corretamente o valor em cima da aresta.
				//Com isso, o valor tambem se locomove conforme a movimentação da aresta
				var xMedia = (this.arestas[i].inicio.posX - this.arestas[i].fim.posX)/2;
				var yMedia = (this.arestas[i].inicio.posY - this.arestas[i].fim.posY)/2;
				
				if(xMedia >= 0 || this.arestas[i].inicio.posX <= this.arestas[i].fim.posX) 
					xMedia *= (-1);							
				if(yMedia >= 0 || this.arestas[i].inicio.posY <= this.arestas[i].fim.posY)
					yMedia *=(-1);
			
				context.font = 'bold 15px Arial';
				context.fillStyle = this.arestas[i].fillText;
				context.fillText(this.arestas[i].valor,this.arestas[i].inicio.posX+xMedia,this.arestas[i].inicio.posY+yMedia);
		    
		    
			context.stroke();
			
		}
		
	};
	
	this.updateVertices = function()
	{
		for (var i in this.vertices){
			context.beginPath();
			context.fillStyle = "#"+this.vertices[i].fill;
			context.arc(this.vertices[i].posX,this.vertices[i].posY,this.vertices[i].raio,0,Math.PI*2,true);
			context.shadowOffsetX = 5;
			context.shadowOffsetY = 5;
			context.shadowBlur    = 4;
			context.shadowColor   = 'gray';
			context.closePath();
			context.fill();
			/*Desenha o valor do nó*/
			context.font = 'bold 14px Arial';
			context.fillStyle = this.vertices[i].fillText;
			context.fillText(this.vertices[i].valor,this.vertices[i].posX-7,this.vertices[i].posY+3);
		}	
		
	};
	
	this.update = function() {
		
		this.clear();
		
		this.updateAresta();
		
		this.updateVertices();
		
	};
	
	this.moverVertice = function(posX,posY,event){
		
		var vertice = this.verticeClicado(posX,posY);
		
		if(vertice != null){
			document.onmousemove = function(e){	
				grafo.setPosX(vertice,mouseX);
				grafo.setPosY(vertice,mouseY);					
				grafo.update();
			};
			document.onmousemove(event);				
		}	
	};
	
	this.clear = function(){
		context.clearRect(0, 0, width,height);
	};
}

function onMouseDown(event){
 	this.style.cursor = 'move';
    
 	if (event.button == 0){
    
 		if(option == 1){    	
	    	//var valorVertice = document.getElementById("inputTexto").value;
	    	grafo.adicionarVertice(null,mouseX,mouseY);    	
		}else if(option == 2){ 
			grafo.moverVertice(mouseX,mouseY,event);		
		}else if(option == 3 || option == 4){		
			grafo.verticeSelecionado = grafo.verticeClicado(mouseX,mouseY);
		}
 	}else if(event.button == 2) {	    	
    	var menu = document.getElementById("context_menu");
	    	
    	grafo.verticeSelecionado = grafo.verticeClicado(mouseX,mouseY);
	    	    
	 	if(grafo.verticeSelecionado != null){	 		
			mostrar(event);
			menu.onmouseout = function(e){				
				var mouseEvent = e;
				var element = mouseEvent.relatedTarget || mouseEvent.toElement; 
				if (element.nodeName != "LI") esconder();				
			};			
		}else{//Usuario possivelmente clicou em uma aresta
			grafo.arestaSelecionada = grafo.arestaClicada(mouseX,mouseY);
			
			if(grafo.arestaSelecionada != null){
				mostrar(event);
				menu.onmouseout = function(e){				
					var mouseEvent = e;
					var element = mouseEvent.relatedTarget || mouseEvent.toElement; 
					if (element.nodeName != "LI") esconder();				
				};
			}
		}		
    }
    if (event.button == 0 || event.button == 1) esconder();	
}

function onMouseUp(event){
	this.style.cursor = 'default';
	document.onmousemove = null;	
	
	if(event.button == 0){
	
		if(option == 3){
			
			var verticeDestino = grafo.verticeClicado(mouseX,mouseY);
			
			if(verticeDestino == null) 
				grafo.update();
			else{			
				if(grafo.verticeSelecionado != verticeDestino){
					if(grafo.searchAresta(grafo.verticeSelecionado,verticeDestino) == null){
						var jaExiste = grafo.searchAresta(verticeDestino,grafo.verticeSelecionado);
						if(jaExiste == null){
							var valorAresta = prompt('Valor da aresta','2');
							if(valorAresta != null)
								grafo.adicionarAresta(grafo.verticeSelecionado.id,verticeDestino.id,valorAresta);						
						}else{
							grafo.adicionarAresta(grafo.verticeSelecionado.id,verticeDestino.id,jaExiste.valor);
							
						}						
					}else{
						alert("Aresta já existente");
					}
					grafo.update();
				}
				
			}
				
			grafo.verticeSelecionado = null;		
		}else if(option == 4){
			
			var verticeDestino = grafo.verticeClicado(mouseX,mouseY);
			
			if(verticeDestino == null) 
				grafo.update();
			else{			
				if(grafo.verticeSelecionado != verticeDestino){
					if(grafo.searchAresta(grafo.verticeSelecionado,verticeDestino) == null){
						var valorAresta = prompt('Valor da aresta','2');
						if(valorAresta != null)
							grafo.adicionarAresta(grafo.verticeSelecionado.id,verticeDestino.id,valorAresta);						
							grafo.adicionarAresta(verticeDestino.id,grafo.verticeSelecionado.id,valorAresta);
						}						
					}else{
						alert("Aresta já existente");
					}
					grafo.update();
				}
				
		}
				
		grafo.verticeSelecionado = null;
	}
}

function onMouseMove(event)
{	
	//Chrome
    if(event.offsetX) {
    	mouseX = event.offsetX;
        mouseY = event.offsetY;
    }else if(event.layerX) {
        mouseX = event.layerX-247;
        mouseY = event.layerY-109;
    }
    //document.getElementById("coordenadas").innerHTML="Coordinates: (" + mouseX + "," + mouseY + ")";   
    
   
    
    //if(event.button == 0){
    
	    if(option == 3 || option == 4){
	    	
			if(grafo.verticeSelecionado != null){
				grafo.clear();
				context.beginPath();
				context.moveTo(grafo.verticeSelecionado.posX,grafo.verticeSelecionado.posY);
				context.lineTo(mouseX,mouseY);
				context.stroke();			
				
				grafo.updateAresta();
				
				grafo.updateVertices();
			}    	
	    }
    
    //}
}


function init(){
	canvas = document.getElementById("canvas");
	
	if (!canvas.getContext){
		alert("Não foi pessível adquirir o contexto");
		return;
	}
	
	context = canvas.getContext("2d");
	
	context.canvas.height = window.innerHeight-120;
	
	
	width = canvas.width;
	height = canvas.height;
	
	option=1;
	
	criarGrafo();	
}

window.addEventListener('load', function () {
	init();
	
	canvas.onmousedown = onMouseDown;	
	canvas.onmouseup = onMouseUp;
	
	document.getElementById("menuAdicionarVertice").onclick = function(e){
		option = 1;
		$("#menuAdicionarVertice").addClass('divMenuPrincipal_selecionado');
		$("#menuAdicionarAresta").removeClass('divMenuPrincipal_selecionado');
		$("#menuMoverVertice").removeClass('divMenuPrincipal_selecionado');
		$("#menuAdicionarArco").removeClass('divMenuPrincipal_selecionado');
		
	};
	document.getElementById("menuAdicionarArco").onclick = function(e){
		option = 3;	
		$("#menuAdicionarArco").addClass('divMenuPrincipal_selecionado');
		$("#menuAdicionarAresta").removeClass('divMenuPrincipal_selecionado');
		$("#menuAdicionarVertice").removeClass('divMenuPrincipal_selecionado');
		$("#menuMoverVertice").removeClass('divMenuPrincipal_selecionado');
	};
	document.getElementById("menuAdicionarAresta").onclick = function(e){
		option = 4;	
		$("#menuAdicionarAresta").addClass('divMenuPrincipal_selecionado');
		$("#menuAdicionarArco").removeClass('divMenuPrincipal_selecionado');
		$("#menuAdicionarVertice").removeClass('divMenuPrincipal_selecionado');
		$("#menuMoverVertice").removeClass('divMenuPrincipal_selecionado');
	};
	document.getElementById("menuMoverVertice").onclick = function(e){
		option = 2;		
		$("#menuMoverVertice").addClass('divMenuPrincipal_selecionado');
		$("#menuAdicionarArco").removeClass('divMenuPrincipal_selecionado');
		$("#menuAdicionarVertice").removeClass('divMenuPrincipal_selecionado');
		$("#menuAdicionarAresta").removeClass('divMenuPrincipal_selecionado');
	};
});

function criarGrafo()
{
	grafo = new Grafo();
	contadorDeIdsVertices = 1;
}

$('#canvas').bind('DOMMouseScroll', function(event) {
	
    var mousex = event.clientX - canvas.offsetLeft;
    var mousey = event.clientY - canvas.offsetTop;
    var wheel = event.detail/15;//n or -n

    var zoom = 1 + wheel/2;
    
    context.translate(
        originx,
        originy
    );
    context.scale(zoom,zoom);
    context.translate(
        -( mousex / scale + originx - mousex / ( scale * zoom ) ),
        -( mousey / scale + originy - mousey / ( scale * zoom ) )
    );

    originx = ( mousex / scale + originx - mousex / ( scale * zoom ) );
    originy = ( mousey / scale + originy - mousey / ( scale * zoom ) );
    scale *= zoom;
    
    grafo.update();
    
});

$(document).ready(function() {
	
	$( "#dialog:ui-dialog" ).dialog( "destroy" );
	
	$( "#dialog-form" ).dialog({
		autoOpen: false,
		height: 200,
		width: 350,
		modal: true,
		buttons: {
			"Abrir": function() {
				var novoGrafo= $("#textAreaNovoGrafo").val().trim();
				
				var objJSON = JSON.parse(novoGrafo);
				
				for(var i in objJSON.vertices){
					vertice = grafo.adicionarVertice(parseInt(objJSON.vertices[i].valor),parseInt(objJSON.vertices[i].posx),parseInt(objJSON.vertices[i].posy));
					vertice.fillText = objJSON.vertices[i].fillText;
					vertice.fill = objJSON.vertices[i].fill;
					vertice.raio = objJSON.vertices[i].raio;
				}
				
				for(var i in objJSON.arestas){
					grafo.adicionarAresta_porValor(objJSON.arestas[i].verticeInicio,objJSON.arestas[i].verticeFim,objJSON.arestas[i].valor);
				}
								
				grafo.update();
				$( this ).dialog( "close" );
				
			},
			Cancel: function() {
				$( this ).dialog( "close" );
			}
		},
		close: function() {
			
		}
	});
	
	$( "#menuAbrir").click(function() {
		$( "#dialog-form" ).dialog( "open" );
	});
	
	
	
	$('#uploadForm').ajaxForm({		 
		beforeSubmit: function(a,f,o) {	        	
			$('#textAreaNovoGrafo').html('Submitting...');
	    },
	    success: function(data) {	    	
	    	$('#textAreaNovoGrafo').html(data);
	    }
    });
	
	$("#menuNovo").click(function(){
		if(confirm("Deseja criar um grafo novo?")){
			criarGrafo();
			grafo.update();
		}
	});
	
	$("#menuEditar").click(function(){
		esconder();
		
		if(grafo.verticeSelecionado != null){
			valor = prompt('Valor:',grafo.verticeSelecionado.valor);			
			if(valor != null)
				grafo.verticeSelecionado.valor = valor; 
		}else if(grafo.arestaSelecionada != null){
			valor = prompt('Peso:',grafo.arestaSelecionada.valor);
			if(valor != null)
				grafo.arestaSelecionada.valor = valor; 
		}
		
		grafo.verticeSelecionado = null;
		grafo.arestaSelecionada = null;
		grafo.update();		
	});
	
	$("#menuRemover").click(function(){
		esconder();
		
		if(grafo.verticeSelecionado != null){
			if(confirm("Deseja apagar o vertice?"))
				grafo.removerVertice(grafo.verticeSelecionado.id);			
		}else if(grafo.arestaSelecionada != null){
			if(confirm("Deseja apagar a aresta?"))
				grafo.removerAresta(grafo.arestaSelecionada);
		}
		
		grafo.arestaSelecionada = null;
		grafo.verticeSelecionado = null;
		grafo.update();
		
		esconder();
	});
	
	$("#menuSalvar").click(function(){
		if(confirm("Deseja salvar?")){
			grafo.salvar();
		}
	});
});

//Retira o menu que aparece quando é clicado com o botão direito na página
document.oncontextmenu = function(){
	return false;
};

function mostrar(e){	
	var menu = document.getElementById("context_menu");
	menu.style.display = "block";
	menu.style.top = e.clientY + 5 + "px";
	menu.style.left = e.clientX + 5 + "px";
}

function esconder(){
	$("#context_menu").hide();	
}