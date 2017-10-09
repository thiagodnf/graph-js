var idVerticeCorrente = -1;
var grafoCorrente = 0;

var cores = [
	'rgb(0,0,0)','rgb(255,0,0)','rgb(0,255,0)','rgb(0,0,255)',
	'rgb(255,255,0)','rgb(255,0,255)','rgb(0,255,255)',
	'rgb(155,0,0)','rgb(0,155,0)','rgb(0,0,155)',
	'rgb(155,155,0)','rgb(155,0,155)','rgb(0,155,155)','rgb(155,155,155)',
	'rgb(55,0,0)','rgb(0,55,0)','rgb(0,0,55)',
	'rgb(55,55,0)','rgb(55,0,55)','rgb(0,55,55)','rgb(55,55,55)'
	];

var executarAlgoritmo = function(grafo,opcao)
{
	switch(opcao)
	{
		case "1":
			executarBuscaEmLargura(grafo);
			break;
		case "2":
			executarBuscaEmProfundidade(grafo);
			break;
		case "3":
			executarOrdenacaoTopologica(grafo);			
			break;
		case "4":
			executarKruskal(grafo);
			break;
		case "5":
			executarPrim(grafo);
			break;
		case "6":
			executarDijkstra(grafo);
			break;
		case "7":
			executarBellmanFord(grafo);
			break;
		case "8":
			var op = 0;
			while(op != 1 && op != 2){
				op = prompt('Qual algoritmo deseja executar?','1');
				if(op == null) return;
			}
			executarColoracao(grafo,op);
			break;
	}
	
};

var executarBuscaEmLargura = function(grafo)
{
	grafoCorrente = grafo;
	var verticeInicial = 0;
	var valorProcurado = 0;
	
	while(grafo.search(verticeInicial) == null){
		verticeInicial = prompt('Vertice Inicial','1');
		if(verticeInicial == null) return;
	}
	
	while(grafo.search(valorProcurado) == null){
		valorProcurado = prompt('Valor Procurado:','1');
		if(valorProcurado == null) return;
	}
	
	var resposta = buscaEmLargura(grafo,verticeInicial-1,valorProcurado-1);
	
	updateVertice(resposta,0);
	
};

var executarBuscaEmProfundidade = function(grafo){
	grafoCorrente = grafo;
	var verticeInicial = 0;
	var valorProcurado = 0;
	
	while(grafo.search(verticeInicial) == null){
		verticeInicial = prompt('Vertice Inicial','1');
		if(verticeInicial == null) return;
	}
	
	while(grafo.search(valorProcurado) == null){
		valorProcurado = prompt('Valor Procurado:','1');
		if(valorProcurado == null) return;
	}
	
	var resposta = buscaEmProfundidade(grafo,verticeInicial-1,valorProcurado-1);
	
	updateVertice(resposta,0);
	
	//
};

var executarOrdenacaoTopologica = function(grafo)
{
	grafoCorrente = grafo;
	var resposta = ordenacaoTopologica(grafo.getMatrizAdjacencia());
	
	updateVertice(resposta,0);
};

var executarKruskal = function(grafo)
{
	grafoCorrente = grafo;
	
	var resposta = kruskal(grafo);
	
	for(var i=0;i<grafo.arestas.length;i++)	{
		grafo.arestas[i].fill = '#DCDCDC';
		grafo.arestas[i].fillText = '#DCDCDC';
	}
	
	updateArestas(resposta,0);
}

var executarPrim = function(grafo)
{
	grafoCorrente = grafo;
	
	var resposta = prim(grafo);
	
	for(var i=0;i<grafo.arestas.length;i++){
		grafo.arestas[i].fill = '#DCDCDC';
		grafo.arestas[i].fillText = '#DCDCDC';
	}
	
	/*for(var i=0;i<resposta.length;i++){
		var aresta = resposta[i];
		aresta.inicio.fill = '#D14836';
		aresta.fim.fill = '#D14836';
		aresta.fill = '#D14836';
		
		arestaVoltando = grafo.searchAresta(aresta.fim,aresta.inicio);
		if(arestaVoltando != null){
			arestaVoltando.inicio.fill = '#D14836';
			arestaVoltando.fim.fill = '#D14836';
			arestaVoltando.fill = '#D14836';
		}
	}
	
	
	
	grafo.update();
	*/
	updateArestas(resposta,0);
}

var executarDijkstra = function(grafo)
{
	if(grafo.temArestasNegativas())
	{
		alert("Atenção! O Grafo possui arestas com pesos negativos.");
		return;
	}
	
	var verticeInicial = 0;
	var verticeFinal = 0;
	
	while(grafo.search(verticeInicial) == null)
	{
		verticeInicial = prompt('Vertice Inicial','1');
		if(verticeInicial == null) return;
	}
		
	while(grafo.search(verticeFinal) == null)
	{
		verticeFinal = prompt('Vertice Final','1');
		if(verticeFinal == null) return;
	}
	
	var resposta = dijkstra(grafo.getMatrizAdjacencia(),verticeInicial-1,verticeFinal-1);
	
	
	for(var i in resposta)
	{
		idVertice = resposta[i]+1;
		
		vertice = grafo.search(idVertice);
		vertice.fill = '#D14836';
		
		if(i != 0)
		{
			aresta = grafo.searchAresta(vertice,grafo.search(resposta[i-1]+1));
			aresta.fill = '#D14836';
			
			arestaVoltando = grafo.searchAresta(grafo.search(resposta[i-1]+1),vertice);
			if(arestaVoltando != null)
				arestaVoltando.fill = '#D14836';
		}		
	}
	
	grafo.update();	
};

var executarBellmanFord = function(grafo)
{
	var verticeInicial = 0;
	var verticeFinal = 0;
	
	while(grafo.search(verticeInicial) == null)
	{
		verticeInicial = prompt('Vertice Inicial','1');
		if(verticeInicial == null) return;
	}
		
	while(grafo.search(verticeFinal) == null)
	{
		verticeFinal = prompt('Vertice Final','1');
		if(verticeFinal== null) return;
	}	
	
	var resposta = bellmanFord(grafo,verticeInicial-1,verticeFinal-1);
	
	for(var i in resposta)
	{
		idVertice = resposta[i]+1;
		
		vertice = grafo.search(idVertice);
		vertice.fill = '#D14836';
		
		if(i != 0)
		{
			aresta = grafo.searchAresta(vertice,grafo.search(resposta[i-1]+1));
			aresta.fill = '#D14836';
			
			arestaVoltando = grafo.searchAresta(grafo.search(resposta[i-1]+1),vertice);
			if(arestaVoltando != null)
				arestaVoltando.fill = '#D14836';
		}		
	}
	
	grafo.update();		
}

var executarColoracao = function(grafo,opcao)
{
	var vetorDeCores = 0;
	
	if(opcao == 1)
		vetorDeCores = coloracao(grafo);
	else
		vetorDeCores = coloracao_MaiorPrimeiro(grafo);
	
	for(var i=0;i<vetorDeCores.length;i++){
		vertice = grafo.search(i+1);		
		vertice.fill = cores[vetorDeCores[i]-1];				
	}	
	
	grafo.update();
}

var dijkstra = function(matrizDeAdjacencia,verticeInicial,verticeFinal)
{
	var queue = PriorityQueue({low: true});
	var distances = new Array(matrizDeAdjacencia.length);
	var pi = new Array(matrizDeAdjacencia.length);
		
    for(var i=0;i<matrizDeAdjacencia.length;i++) 
    {
        distances[i] = 99999999999;
        pi[i] = -1;
    }

    distances[verticeInicial] = 0;
    queue.push(verticeInicial,distances[verticeInicial]);

    while( ! queue.empty()) 
    {
        nodotmp = queue.top();
        i = queue.pop();       

        for (var j = 0; j<matrizDeAdjacencia.length; j++)
        {
            if (parseInt(matrizDeAdjacencia[i][j]) > 0 && parseInt(distances[i]) + parseInt(matrizDeAdjacencia[i][j]) < parseInt(distances[j])) 
            {
                distances[j] = parseInt(distances[i]) + parseInt(matrizDeAdjacencia[i][j]);
                pi[j] = i;
                queue.push(j,-parseInt(distances[j]));
            }
        }

    }
    
    var resposta = new Array();
    resposta.push(verticeFinal);   
        
	while (pi[verticeFinal] != -1) {
		resposta.push(pi[verticeFinal]);
		verticeFinal = pi[verticeFinal];
	}
	
	return resposta;
};

var updateVertice = function(resposta,i){
	grafoCorrente.update();
	
	vertice = grafoCorrente.search(resposta[i]+1);
	
	
	if(i+1 == resposta.length)
		vertice.fill = 'rgb(0,255,0)';	
	else
		vertice.fill = '#D14836';
		
	grafoCorrente.update();
	count = i;
	respostas = resposta;
	
	if(i+1 != resposta.length)
		setTimeout("updateVertice(respostas,count+1)",1000);
	else{
		vetor = '';
		for(var i=0;i<resposta.length;i++){
			vetor += resposta[i]+1;
			if(i+1 != resposta.length)
				vetor += ',';
		}
		
		$("#dialog-padrao-texto").text(vetor);
		$("#dialog-padrao-titulo").text("Resultado");		
		$( "#dialog-padrao" ).dialog({modal: true});
	}		
};

var updateArestas = function(resposta,i){
	grafoCorrente.update();

	var aresta = resposta[i];
	aresta.inicio.fill = '#D14836';
	aresta.fim.fill = '#D14836';
	aresta.fill = '#D14836';	
	aresta.fillText = 'black';
	
	arestaVoltando = grafoCorrente.searchAresta(aresta.fim,aresta.inicio);
	if(arestaVoltando != null){
		arestaVoltando.inicio.fill = '#D14836';
		arestaVoltando.fim.fill = '#D14836';
		arestaVoltando.fill = '#D14836';
		arestaVoltando.fillText = 'black';
	}
	
	//Algum bug do setTimeOut :-D. Só sai se fizer isso
	count = i;
	respostas = resposta;
	
	if(i != resposta.length)
		setTimeout("updateArestas(respostas,count+1)",1000);	
}

var buscaEmLargura = function(grafo,verticeInicial,valorProcurado){
	matriz = grafo.getMatrizAdjacencia();
	
	var marcacao = new Array(matriz.length);
	for (var j = 0; j<matriz.length; j++)
		marcacao[j] = 0;
	
	var resposta = new Array();
	
	var fila = new Array(); 
	fila.push(verticeInicial);
	
	while( fila.length != 0){
		var vertice = fila.shift();
		marcacao[vertice] = 1;
		resposta.push(vertice);
		
		if(parseInt(vertice) == parseInt(valorProcurado))
			break;
		
		for (var j = 0; j<matriz.length; j++){
			//A ligacao existe
			if(matriz[vertice][j] != 0){
				if(marcacao[j] == 0){
					marcacao[j] = 1;
					fila.push(j);					
				}
			}
		}		
	}
	
	return resposta;	
};

var buscaEmProfundidade = function(grafo,verticeInicial,valorProcurado)
{
	matriz = grafo.getMatrizAdjacencia();
	
	var marcacao = new Array(matriz.length);
	var resposta = new Array();	
	var pilha = new Array();	
	
	for (var j = 0; j<matriz.length; j++)
		marcacao[j] = 0;	
	 
	pilha.push(verticeInicial);
	marcacao[verticeInicial] = 1;	
	
	buscaEmProfundidade_busca(matriz,resposta,marcacao,verticeInicial,valorProcurado);
	
	return resposta;	
};

var buscaEmProfundidade_busca = function(matriz,resposta,marcacao,idVertice,valorProcurado)
{
	marcacao[idVertice] = 1;
	resposta.push(idVertice);
	
	if(parseInt(idVertice) == parseInt(valorProcurado))
		return true;
	
	for (var j = 0; j<matriz.length; j++){
		//A ligacao existe
		if(matriz[idVertice][j] != 0){
			if(marcacao[j] == 0)			{
				achou = buscaEmProfundidade_busca(matriz,resposta,marcacao,j,valorProcurado);
				if(achou) return true;												
			}			
		}		
	}	
	return false;
};

var ordenacaoTopologica = function(matriz)
{
	var verticesFonte = new Array();
	var resposta = new Array();
	
	//Descobrir todos os vertices que são FONTE
	for(var j=0;j<matriz.length;j++)
	{		
		if(isVerticeFonte(matriz,j))
			verticesFonte.push(j);
	}
	
	if(verticesFonte.length == 0){
		alert("Nenhum vertice FONTE encontrado!");
		return;
	}
	
	if(temCiclo(matriz,0)){
		alert("O Grafo tem ciclo!")
		return;
	}
	
	while( verticesFonte.length != 0)
	{
		idVertice = verticesFonte.shift();
		resposta.push(idVertice);
		
		for(var j = 0;j<matriz.length;j++)
		{
			if(matriz[idVertice][j] != 0)
			{
				matriz[idVertice][j] = 0;
				if(isVerticeFonte(matriz,j))
					verticesFonte.push(j);
			}
		}	
	}
		
	return resposta;
};

var isVerticeFonte = function(matriz,idVertice)
{
	verticeFonte = true;
	for(var i=0;i<matriz.length;i++)
	{
		if(matriz[i][idVertice] != 0)
		{
			verticeFonte = false;
			break;				
		}			
	}
	return verticeFonte;
};

/**
 * http://www.ime.usp.br/~pf/analise_de_algoritmos/aulas/cycles-and-dags.html
 */
var temCiclo = function(matriz,idVertice)
{
	var marca = new Array(matriz.length);
	
	for(var i=0;i<marca.length;i++)
		marca[i] = 'B';
	
	for(var i=0;i<marca.length;i++){
		if(marca[i] == 'P')
			continue;
		marca[i] = 'C';
		if(temCiclo_DFS(matriz,i,marca))
			return true;
	}
	
	return false;
};

var temCiclo_DFS = function(matriz,idVertice,marca){
	for (var j=0;j<matriz.length;j++){
		if(matriz[idVertice][j] != 0){
			if(marca[j] == 'P') 
				continue;
			if(marca[j] == 'C') 
				return true;
			marca[j] = 'C';
			if (temCiclo_DFS(matriz,j,marca)) 
				return true;
		}
   }
   marca[idVertice] = 'P';
   return false;
}

/**
 * http://www.professeurs.polymtl.ca/michel.gagnon/Disciplinas/Bac/Grafos/Arvores/arvores.html#Kruskal
 */
var kruskal = function(grafo)
{
	var queue = PriorityQueue({low: true});
	var n = grafo.vertices.length;
	var agm = new Array();
	var l = new Array(grafo.vertices.length);
	
	for(var i=0;i<l.length;i++)
	{
		l[i] = new Array();
		l[i].push(i);
	}		
	
	for(var i=0;i<grafo.arestas.length;i++)
		queue.push(grafo.arestas[i],grafo.arestas[i].valor);	
	
	while(agm.length < n-1 && ! queue.empty())
	{
		var aresta = queue.pop();
		
		var agm1 = kruskal_Find(aresta.inicio.id-1,l);
		var agm2 = kruskal_Find(aresta.fim.id-1,l);
		
		if(agm1 != agm2)
		{
			kruskal_Merge(agm1,agm2,l);
			agm.push(aresta);
		}		
	}	
	
	return agm;	
}

var kruskal_Find = function(idVertice,l)
{
	for(var i=0;i<l.length;i++)
	{
		for(var j=0;j<l[i].length;j++)
		{
			if(l[i][j] == idVertice)
				return i;			
		}			
	}
}

var kruskal_Merge = function(agm1,agm2,l)
{
	while(l[agm2].length != 0)
	{
		l[agm1].push(l[agm2].pop())
	}	
}

/**
 * http://www.professeurs.polymtl.ca/michel.gagnon/Disciplinas/Bac/Grafos/Arvores/arvores.html
 */
var prim = function(grafo)
{
	if(grafo.empty())
	{
		alert('Grafo está vazio');
		return;
	}
	
	var matriz = grafo.getMatrizAdjacencia();
	var queue = PriorityQueue({low: true});
	
	var mais_perto = new Array(matriz.length);
	var dist_mais_perto = new Array(matriz.length);
	
	var T = new Array();

	for(var i=1;i<matriz.length;i++)
	{
		mais_perto[i] = 0
		dist_mais_perto[i] = (matriz[i][0] == 0)?9999999999999999:matriz[i][0];
	}
	for(var i=0;i<matriz.length-1;i++)
	{
		//Repetir n-1 vezes:
		min  = 9999999999999999;
		var k;
		for(var j=1;j<matriz.length;j++)
		{
			if(parseInt(dist_mais_perto[j]) >= 0 && parseInt(dist_mais_perto[j]) < parseInt(min))
			{
				min = dist_mais_perto[j];
				k = j;
			}
		}
		T.push(grafo.searchAresta(grafo.search(k+1),grafo.search(mais_perto[k]+1)));
		dist_mais_perto[k] = -1;
		for(var j=1;j<matriz.length;j++)
		{
			valor = (matriz[k][j] == 0)?9999999999999999:matriz[k][j];
			if(parseInt(valor) < parseInt(dist_mais_perto[j]))
			{
				dist_mais_perto[j] = (matriz[k][j] == 0)?9999999999999999:matriz[k][j];;
				mais_perto[j] = k;
			}
		}			
   	}  
	return T;
}

var bellmanFord = function(grafo,verticeInicial,verticeFinal)
{
	var i;
	var j;
	var trocou;
	var distancia = new Array(grafo.vertices.length);
	var pi = new Array(grafo.vertices.length);
	
	
    for (var i = 0; i < grafo.vertices.length; i++) 
    {
       distancia[i] = 999999999999999999;
       pi[i] = -1;
    }
    
    distancia[verticeInicial] = 0;
    
    for (var i = 0; i < grafo.vertices.length; i++) 
    {
       trocou = 0;
       for (var j = 0; j < grafo.arestas.length; j++) 
       {
          if (parseInt(distancia[grafo.arestas[j].fim.id-1]) > parseInt(distancia[grafo.arestas[j].inicio.id-1]) + parseInt(grafo.arestas[j].valor)) 
          {
             distancia[grafo.arestas[j].fim.id-1] = parseInt(distancia[grafo.arestas[j].inicio.id-1]) + parseInt(grafo.arestas[j].valor);
             pi[grafo.arestas[j].fim.id-1] = grafo.arestas[j].inicio.id-1;
             trocou=1;
          }
       }
       // se nenhuma iteração teve efeito, futuras iterações estão dispensadas
       if (trocou==0) break;
    }
    // usado somente para detectar ciclos negativos (dispensável)
    for (var i = 0; i < grafo.arestas.length; i++)
    {
       if (parseInt(distancia[grafo.arestas[i].fim.id-1]) > parseInt(distancia[grafo.arestas[i].inicio.id-1]) + parseInt(grafo.arestas[i].valor)) 
       {
          alert("Ciclo negativo de pesos de arestas detectado")
          return;
       }
    }
    
    var resposta = new Array();
    resposta.push(verticeFinal);   
        
	while (pi[verticeFinal] != -1) {
		resposta.push(pi[verticeFinal]);
		verticeFinal = pi[verticeFinal];
	}
	
	return resposta;    
}

/**
 * Quanto maior o grau de um vértice, mais difícil será colorir esse vértice. 
 * Por ter mais vértices adjacentes que os outros, esse vértice fica mais restringido 
 * para seleção de uma cor. Então, tal vértice deveria ser colorido o mais cedo possível. 
 * Isso resultara no algoritmo do Maior primeiro: 
 * 
 * url: http://www.professeurs.polymtl.ca/michel.gagnon/Disciplinas/Bac/Grafos/Color/color.html
 */
var coloracao_MaiorPrimeiro = function(grafo){
	var corDoVertice = new Array(grafo.vertices.length);	
	var matriz = grafo.getMatrizAdjacencia();
	var queue = PriorityQueue();
	var vertices = new Array();
	
	for(var i=0;i<corDoVertice.length;i++){
		corDoVertice[i] = -1;
		queue.push(i,coloracao_MaiorPrimeiro_GrauDoVertice(matriz,i));
	}
	
	//Usamos a fila de prioridade para ordenar, agora vamos jogar tudo em um vetor
	//para fazer a manipulação
	while( ! queue.empty())
		vertices.push(queue.pop());
	
	var cor = 1;
	
	while(coloracao_MaiorPrimeiro_temVerticesNaoColoridos(corDoVertice)){
		for(var i=0;i<vertices.length;i++){
			var idVertice = vertices[i];
			if(corDoVertice[idVertice] == -1){
				var nenhumVerticeAdjPossuiACorC = true;
				for(var j=0;j<matriz.length;j++){
					if(parseInt(matriz[idVertice][j]) != 0){
						if(parseInt(corDoVertice[j]) == parseInt(cor)){
							nenhumVerticeAdjPossuiACorC = false;
						}
					}
				}
				if(nenhumVerticeAdjPossuiACorC){
					corDoVertice[idVertice] = cor;
				}				
			}
		}
		cor++;
	}
	
	return corDoVertice;	
}

var coloracao_MaiorPrimeiro_temVerticesNaoColoridos = function(cor){
	for(var i in cor)
		if(cor[i] == -1)
			return true;
	
	return false
}

var coloracao_MaiorPrimeiro_GrauDoVertice = function(matriz,idVertice){
	var grau = 0;
	
	for(var j=0;j<matriz.length;j++){
		if(matriz[idVertice][j] != 0)
			grau++;
	}	
	
	return grau;
}


/**
 * Existe uma outra versão (na verdade, a versão apresentada normalmente no livros) desse algoritmo. 
 * O raciocínio, que retorna o mesmo resultado, é o seguinte. Supondo uma ordem de percurso dos vértices. 
 * Atribuimos uma cor ao primeiro vértice. Depois, percorremos sequencialmente todos os vértices. 
 * Para cada vértice v visitado, consideramos as cores já utilizadas. 
 * A primeira cor que não pertence a nenhum dos vértices adjacentes a v será escolhida para colorir v. 
 * Se os vértices adjacentes coloridos já usam todas as cores, o vértice v será colorido com uma nova cor. 
 * O algoritmo continua assim por diante até a coloração completa do grafo. 
 */
var coloracao = function(grafo){
	var cor = new Array(grafo.vertices.length);
	
	var matriz = grafo.getMatrizAdjacencia();
	
	for(var i=0;i<cor.length;i++){
		cor[i] = -1;	
	}
	
	c = 1; //Primeira cor usada
	cor[0] = c;
	
	for(var v=1;v<grafo.vertices.length;v++)
	{
		var ok = true;
		
		for(var k=1;k<=c;k++){
			//Para cada vértice u adjacente a v: 
			for(var u=0;u<matriz.length;u++){
				if(parseInt(matriz[v][u]) != 0){
					if(cor[u] == k){
						ok = false;
						break;
					}
				}
			}
			//Achamos uma cor que nenhum vértice possui}
			if(ok == true){
				cor[v] = k;
				break;
			}			
		}
		if(ok == false){
			//Todas as cores atuais são usadas pelos vértice adjacentes
			c++;
			cor[v] = c;
		}		
	}
	
	return cor;
}


