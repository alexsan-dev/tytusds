// GLOBALES
let treeStructure: TreeStructure | null = null
let treeElementsLength: number = 7
let maxTreeHeight: number = 0
let treeClassName: string = ''
let bTreeGrade: number = 0

// ARBOLES B
let bTreeStructure: ArbolB | null = null
let isBTree: boolean = false

// ELEMENTOS
const inputGrade = document.getElementById('grade-input')

// CONFIGURACIONES
canvasBannerDif = 140

// DATOS INICIALES
const setTreeStructure = (
	treeInstance: TreeStructure | null,
	instanceClassName: string,
	bTreeInstance: ArbolB,
) => {
	// CONFIGURAR GLOBALES
	treeStructure = treeInstance
	treeClassName = instanceClassName

	// ELEMENTOS INICIALES
	if (treeStructure) {
		treeStructure.insertar(4)
		treeStructure.insertar(8)
		treeStructure.insertar(2)
		treeStructure.insertar(1)
		treeStructure.insertar(3)
		treeStructure.insertar(9)
		treeStructure.insertar(7)

		// ACTUALIZAR ALTURA
		maxTreeHeight = treeStructure.raiz.altura
	}

	if (bTreeInstance) {
		isBTree = true
		bTreeGrade = 3
		bTreeStructure = new ArbolB(3)
		bTreeStructure.insertar(1)
		bTreeStructure.insertar(2)
		bTreeStructure.insertar(3)
		bTreeStructure.insertar(4)
		bTreeStructure.insertar(5)
		bTreeStructure.insertar(6)
		bTreeStructure.insertar(7)
		bTreeStructure.insertar(8)
		bTreeStructure.insertar(9)
		bTreeStructure.insertar(10)
	}
}

// GUARDAR ARCHIVO
const saveJSONTreeFile = () => {
	if (treeStructure) {
		if ('toArray' in treeStructure) {
			// CONVERTIR A ARREGLO
			const valores: (string | number)[] = treeStructure.toArray()

			// SUBIR
			saveJSONFile(valores)
		}
	}
}

// LEER ARCHIVO
fileUploadCallback = (json: JSONInputFile) => {
	const { valores } = json

	// BORRAR
	if (treeStructure) treeStructure.raiz = null

	// TEXTOS
	treeElementsLength = 0
	if (editor)
		// @ts-ignore
		editor.innerHTML = `<strong style="color:var(--monoConstIce)">const</strong> data <i style='color:var(--graySoda)'>=</i> <strong style='color:var(--keywordSoda)'>new</strong> <strong style="color:var(--monoClassIce)">${treeClassName}</strong><strong style="color:var(--gray)">&#x3c;</strong><strong style="color:var(--monoNumberIce)">number</strong><strong style="color:var(--gray)">&#x3e;</strong>()\n`

	// ITERAR
	if (isBTree) {
		bTreeGrade = globalJSONInput?.grado || 3
		bTreeStructure = new ArbolB(bTreeGrade)
	}

	// AGREGAR AL ARBOL
	valores.forEach((valor: string | number) => {
		newNodeValue = valor.toString()
		addNodeOnTree()
	})

	// NUMERO ELEMENTOS
	treeElementsLength = valores.length
	setElementsLength(valores.length)
}

// DIBUJAR
drawInCanvas = () => {
	if (canvasCtx) {
		// POSICIÓN INICIAL
		canvasCtx.save()
		canvasCtx.restore()
		canvasCtx.translate(
			-Math.pow(2, maxTreeHeight) * 50 - 640,
			maxTreeHeight * -41,
		)

		if (treeStructure) {
			// COLA DE NODOS
			const queue: (TreeNode | null)[] = treeStructure
				? [treeStructure.raiz]
				: []
			let levelCounter: number = 0

			// ITERAR ÁRBOL POR BFS
			for (
				let treeHeightIndex: number = maxTreeHeight;
				treeHeightIndex > 0;
				treeHeightIndex--
			) {
				for (
					let treeXIndex: number = 0;
					treeXIndex < Math.pow(2, maxTreeHeight - treeHeightIndex);
					treeXIndex++
				) {
					// NODO
					const node: TreeNode | null = queue.shift() || null
					queue.push(node?.izquierdo || null)
					queue.push(node?.derecho || null)

					// IZQUIERDO O DERECHO
					const isRight: boolean = treeXIndex % 2 === 1

					// REINICIAR TRASLACIÓN
					if (treeHeightIndex !== levelCounter) {
						canvasCtx.restore()
						canvasCtx.translate(Math.pow(2, treeHeightIndex) * 25, 0)
						canvasCtx.save()
						levelCounter = treeHeightIndex
					}

					// COLOR
					canvasCtx.strokeStyle =
						canvasObjectColors[maxTreeHeight - treeHeightIndex]

					// POSICIÓN
					canvasCtx.translate(Math.pow(2, treeHeightIndex) * 50, 0)

					if (node) {
						// LINEA
						canvasCtx.beginPath()
						canvasCtx.lineWidth = 5

						// ARISTA IZQUIERDA
						if (isRight) {
							canvasCtx.moveTo(0, (maxTreeHeight - treeHeightIndex) * 100)
							canvasCtx.lineTo(
								Math.pow(2, treeHeightIndex) * -25 + 10,
								(maxTreeHeight - treeHeightIndex) * 100 - 75,
							)
						}

						// ARISTA DERECHA
						else if (treeHeightIndex !== maxTreeHeight) {
							canvasCtx.moveTo(0, (maxTreeHeight - treeHeightIndex) * 100)
							canvasCtx.lineTo(
								Math.pow(2, treeHeightIndex) * 25 - 10,
								(maxTreeHeight - treeHeightIndex) * 100 - 75,
							)
						}

						// DIBUJAR ARISTAS
						canvasCtx.stroke()
						canvasCtx.closePath()

						// CIRCULO
						canvasCtx.beginPath()
						canvasCtx.fillStyle = isDarkMode ? '#aaa' : 'rgb(248, 248, 248)'
						canvasCtx.lineWidth = 7
						canvasCtx.arc(
							0,
							(maxTreeHeight - treeHeightIndex) * 100,
							25,
							0,
							2 * Math.PI,
						)

						// DIBUJAR BORDE Y CIRCULO
						canvasCtx.stroke()
						canvasCtx.fill()
						canvasCtx.closePath()

						// ESTILO DEL TEXTO
						canvasCtx.beginPath()
						canvasCtx.textAlign = 'center'
						canvasCtx.textBaseline = 'middle'
						canvasCtx.fillStyle = isDarkMode ? '#aaa' : '#011f3bcc'
						canvasCtx.font = `bold ${
							20 - node.valor.toString().length * 2.5
						}px Montserrat`

						// TEXTO
						canvasCtx.fillText(
							node.valor,
							treeHeightIndex > 1 ? 50 * (isRight ? 1 : -1) : 0,
							(maxTreeHeight - treeHeightIndex) * 100 +
								(treeHeightIndex > 1 ? 0 : 50),
						)

						canvasCtx.closePath()
					}
				}
			}
		}

		if (isBTree && bTreeStructure) {
			// COLA DE NODOS
			let tempTreeLevelCounter: number = -1
			const bQueue: BTreeData[] = bTreeStructure
				? [
						{
							values: [bTreeStructure.raiz],
							level: 0,
						},
				  ]
				: []

			// RECORRER NODOS
			while (bQueue.length > 0) {
				// NODOS
				const treeNode: BTreeData | undefined = bQueue.shift()

				if (treeNode && treeNode.values.length) {
					// GRÁFICA
					const level = treeNode?.level
					const treeNodeLength = treeNode.values?.length || 0

					for (
						let nodeValuesIndex: number = 0;
						nodeValuesIndex < treeNodeLength;
						nodeValuesIndex++
					) {
						// AGREGAR A LA PILA
						const node = treeNode.values[nodeValuesIndex]

						if (node.hijos.length)
							bQueue.push({
								values: node.hijos,
								level: treeNode.level + 1,
							})

						// CONSTANTES DE ITERACIÓN POR VALORES
						const nodeContentLength: number = node.valores.length || 0
						const translateMargin: number =
							Math.pow(nodeContentLength, level) * (80 / (level + 1))

						// REINICIAR TRASLACIÓN
						if (tempTreeLevelCounter !== level) {
							canvasCtx.restore()

							// GUARDAR
							canvasCtx.save()

							// NUMERO DE NODOS SIGUIENTES
							const nextNodeValues = [treeNode, ...bQueue]
								.map((bTreeData: BTreeData) => {
									if (bTreeData.level === tempTreeLevelCounter + 1)
										return [
											bTreeData.values
												.map((value: NodoB) => value.valores.length)
												.reduce((a, b) => a + b),
											bTreeData.values.length,
										]
									else return false
								})
								.filter(Boolean) as number[][]

							// ASIGNAR VARIABLES DE TRASLACIÓN
							const treeNodesPerLevel = nextNodeValues.reduce(
								(a, b) => a + b[0],
								0,
							)
							const treeNodeTotalLength = nextNodeValues.reduce(
								(a, b) => a + b[1],
								0,
							)
							tempTreeLevelCounter = level

							// TRASLADAR
							canvasCtx.translate(
								(translateMargin * (treeNodeTotalLength - 1) +
									70 * treeNodesPerLevel) /
									-2,
								0,
							)
						}

						// TEXTO DE NODOS
						for (
							let nodeContentIndex: number = 0;
							nodeContentIndex < nodeContentLength;
							nodeContentIndex++
						) {
							// TEXTO
							const nodeContent: number | string =
								node.valores[nodeContentIndex]

							// COLOR
							canvasCtx.strokeStyle = canvasObjectColors[level]

							if (node && nodeContent.toString().length) {
								// POSICIÓN
								canvasCtx.translate(70, 0)

								// CUADRO RECUBRIDOR
								canvasCtx.beginPath()
								canvasCtx.fillStyle = isDarkMode
									? 'hsl(0deg 0% 57%)'
									: 'hsl(0deg 0% 87%)'
								if (nodeContentLength > 1 && nodeContentIndex === 0)
									canvasCtx.fillRect(0, level * 100, 50 * nodeContentLength, 50)
								canvasCtx.fill()
								canvasCtx.closePath()

								// RECTÁNGULO
								canvasCtx.beginPath()
								canvasCtx.fillStyle = isDarkMode ? '#aaa' : 'rgb(248, 248, 248)'
								canvasCtx.lineWidth = 7

								// NODO
								canvasCtx.roundRect(0, level * 100, 50, 50, 10)

								// DIBUJAR BORDE
								canvasCtx.stroke()
								canvasCtx.fill()
								canvasCtx.closePath()

								// ESTILO DEL TEXTO
								canvasCtx.beginPath()
								canvasCtx.textAlign = 'center'
								canvasCtx.textBaseline = 'middle'
								canvasCtx.fillStyle = '#011f3bcc'
								canvasCtx.font = `bold ${
									20 - nodeContent.toString().length * 2.5
								}px Montserrat`

								// TEXTO
								canvasCtx.fillText(nodeContent.toString(), 25, level * 100 + 25)

								canvasCtx.closePath()
							}
						}

						// TRASLACIÓN DE ARRAY
						canvasCtx.translate(translateMargin, 0)
					}
				}
			}
		}
	}
}

// AGREGAR NODO
const addNodeOnTree = () => {
	if (newNodeValue.length > 0) {
		// INSERTAR
		if (isBTree && bTreeStructure) bTreeStructure.insertar(newNodeValue)
		else if (treeStructure) {
			treeStructure.insertar(newNodeValue)
			maxTreeHeight = treeStructure.raiz.altura
		}

		// RE DIMENSION
		setElementsLength(treeElementsLength + 1)

		// AGREGAR MUESTRA DE CÓDIGO
		addTestCode('insertar', newNodeValue)

		// OCULTAR MENU
		hideNavMenu(1)
		removeBanner()
	}
}

// ELIMINAR NODO
const removeNodeOnTree = () => {
	if (oldNodeValue.length > 0) {
		// ELIMINAR
		if (isBTree && bTreeStructure) bTreeStructure.eliminar(oldNodeValue)
		else if (treeStructure) {
			treeStructure.eliminar(oldNodeValue)
			maxTreeHeight = treeStructure.raiz.altura
		}

		// RE DIMENSION
		setElementsLength(treeElementsLength - 1)

		// AGREGAR MUESTRA DE CÓDIGO
		addTestCode('eliminar', oldNodeValue)

		// OCULTAR MENU
		hideNavMenu(1)
		removeBanner()
	}
}

// ACTUALIZAR NODO
const updateNodeOnTree = () => {
	if (oldNodeValue.length > 0 && newNodeValue.length > 0) {
		// ACTUALIZAR
		if (isBTree && bTreeStructure)
			bTreeStructure.actualizar(oldNodeValue, newNodeValue)
		else if (treeStructure) {
			treeStructure.actualizar(oldNodeValue, newNodeValue)
			maxTreeHeight = treeStructure.raiz.altura
		}

		// AGREGAR MUESTRA DE CÓDIGO
		addTestCode('actualizar', `${oldNodeValue},${newNodeValue}`)

		// OCULTAR MENU
		hideNavMenu(1)
		removeBanner()
	}
}

// BUSCAR NODO
const findNodeOnTree = () => {
	if (oldNodeValue.length > 0) {
		if (treeStructure) {
			if ('obtener' in treeStructure) {
				const searchedNode = treeStructure.obtener(oldNodeValue.toString())
				if (searchedNode) {
					// AGREGAR MUESTRA DE CÓDIGO
					addTestCode('obtener', `${oldNodeValue}`)

					// OCULTAR MENU
					hideNavMenu(1)
					removeBanner()

					// ALERTA
					alert(
						`Nodo encontrado:\nValor: ${oldNodeValue}\nAltura: ${
							searchedNode.altura
						}\nIzquierdo: ${searchedNode.izquierdo?.valor || null}\nDerecho: ${
							searchedNode.derecho?.valor || null
						}`,
					)
				} else alert('Nodo no encontrado')
			}
		}
	}
}

// INPUT DE GRADO ÁRBOL B
const onChangeInputGrade = (ev: Event) => {
	const target = ev.target as HTMLInputElement
	bTreeGrade = +target.value
}
