	 // COMPARACION


	/** SCRIPT PARA MEDIO EL TIEMPO DE PROCESADO
	 *
	 *
	 *
	**/





			function pruebaCiclos(){

				value = 1024*1024*4;
				AA = Uint8ClampedArray(value);
				BB = Uint8ClampedArray(value);
				ZZ = Uint8ClampedArray(value);
				XX = Uint8ClampedArray(value);
				CC = Uint8ClampedArray(value);
				DD = Uint8ClampedArray(value);
				FF = Uint8ClampedArray(value);


				contA = 0;
				contB = 0;
				contZ = 0;
				contC = 0;
				contD = 0;

				console.profile("t1");
				console.time("while_prog");

					k = -1;

					do{
						AA[++k]=104;
						contA++;
					}while (k<AA.length);


				console.timeEnd("while_prog");
				console.profileEnd();

				console.profile("t2");
				console.time("while_reg");


				t=BB.length;

					do{
						BB[--t]=100;
						contB++;
					}while (t);


				console.timeEnd("while_reg");
				console.profileEnd();


				console.profile("t6");
				console.time("while_reg_mul");


				t=ZZ.length;

					do{
						ZZ[t-=4]=100;
						ZZ[t+1]=100;
						ZZ[t+2]=100;
						ZZ[t+3]=100;
	//					contZ++;
					}while (t);


				console.timeEnd("while_reg_mul");
				console.profileEnd();



				console.profile("t15");
				console.time("while_reg_mul_posta");


				t=XX.length;

					do{
						XX[t-1] = 100;
						XX[t-2] = 100;
						XX[t-3] = 100;
						XX[t-=4]= 100;
			//			contZ++;
					}while (t);


				console.timeEnd("while_reg_mul_posta");
				console.profileEnd();






				console.profile("t3");
				console.time("for_prog");

					for(m=0;m<CC.length;m++){
						CC[m]=1*m;
						contC++;
					}


				console.timeEnd("for_prog");
				console.profileEnd();




				console.profile("t4");
				console.time("for_reg");

				for(var p=DD.length;p>-1;p--){
					DD[p]=50;
					contD++;
				}


				console.timeEnd("for_reg");
				console.profileEnd();



				console.profile("t25");
				console.time("por_JS");



				GG = (new Array(value).toString().replace(/,/g, "0,") + "0").split(",");
				FF.set(GG,0);

				console.timeEnd("por_JS");
				console.profileEnd();


				console.log("operaciones:"+contA+", "+contB+", "+contZ+", "+contC+", "+contD);
			}
			
			
			
			//MAXIMO Y MINIMO
			
			function pruebaBusquedaMaximoMinimo(){


				//Math.max.apply(Math, [4,8,3,5,1,2]);
				//Math.floor(Math.random()*11);

							value = 1024*1024*4;
							ZZ = Uint8ClampedArray(value);
							BB = Uint8ClampedArray(value);


				//			contA = 0;
				//			contB = 0;


				//			console.profile("t6");
				//			console.time("while_reg_mul");

							//llenado
							
							t=ZZ.length;

								do{
									ZZ[t-1] = 30;
									ZZ[t-2] = Math.floor(Math.random()*11);
									ZZ[t-3] = Math.floor(Math.random()*11);
									ZZ[t-=4]= Math.floor(Math.random()*11);

							//		contZ++;
								}while (t);


				//			console.timeEnd("while_reg_mul");
				//			console.profileEnd();




							/***
							 *
							 *
							 * */

							//Armar y buscar

							//Se llena el vector y se busca median funciones definidas
								//diverge para muchos elementos
								
			/*
							console.profile("t6");
							console.time("armar_y_buscar");

							BB = Uint8ClampedArray(ZZ.length*.25);

							t=ZZ.length;
							k=BB.length;

							do{
								BB[--k]=ZZ[t-=4];
							}while (t);

							M = Math.max.apply(Math, BB);
							m = Math.min.apply(Math, BB);

							console.timeEnd("armar_y_buscar");
							console.profileEnd();

			*/
								
				//			console.log("MAx: "+M+", Min "+m);

							/***
							 *
							 *
							 * */

							//Buscar sin armar

							//
								
							// busco sobre la marcha con el IF corto
								
							console.profile("t7");
							console.time("armar_sin_buscar_if_corto");

							t=ZZ.length;

							M1 = ZZ[t-4];
							m1 = ZZ[t-4];

							do{



								M1 = (ZZ[t-4] > M1)? ZZ[t-4] : M1;
								m1 = (ZZ[t-=4] < m1)? ZZ[t] : m1;

							}while (t);

							console.timeEnd("armar_sin_buscar_if_corto");
							console.profileEnd();


				//			console.log("MAx: "+M1+", Min "+m1);


							// buscar sobre la marcha con IF largo

								console.profile("t8");
								console.time("armar_sin_buscar_if_largo_1");

								t=ZZ.length;




								M2 = ZZ[t-4];
								m2 = ZZ[t-4];

								do{


									if(ZZ[t-=4] > M2){

										M2 =  ZZ[t];
									}
									else{if(ZZ[t] < m2){

										m2 = ZZ[t];
									}}


								}while (t);

								console.timeEnd("armar_sin_buscar_if_largo_1");
								console.profileEnd();


					//			console.log("MAx: "+M2+", Min "+m2);




							console.profile("t9");
							console.time("armar_sin_buscar_if_largo_3");

							// busco por funcion el menor y el mayor de cada pixel (4 valores)
							// y busco el resto del arreglo mediante if largo
							
							t=ZZ.length;

						//	_M_t = Math.max.apply(Math, [ZZ[t-2],ZZ[t-3],ZZ[t-4]]);
							_M_t = Math.max(ZZ[t-2], Math.max(ZZ[t-3],ZZ[t-4]));
							_m_t = Math.min(ZZ[t-2], Math.max(ZZ[t-3],ZZ[t-4]));

						//	_m_t = Math.min.apply(Math, [ZZ[t-2],ZZ[t-3],ZZ[t-=4]]);


							M3 = _M_t;
							m3 = _m_t;

							do{

								_M_t = Math.max(ZZ[t-2], Math.max(ZZ[t-3],ZZ[t-4]));
								_m_t = Math.min(ZZ[t-2], Math.max(ZZ[t-3],ZZ[t-=4]));

								if(_M_t > M3){

									M3 =  _M_t;
								}
								else{if(_m_t < m3){

									m3 = _m_t;
								}}


							}while (t);

							console.timeEnd("armar_sin_buscar_if_largo_3");
							console.profileEnd();


				//			console.log("MAx: "+M3+", Min "+m3);







							console.profile("t10");
							console.time("preguntar_hasta_morir");

							// busco con IF largo el mayor y el menor en cada elemento
							// no utilizo el IF
							// se evitan saltos, es el metdo mas eficiente
							
								t=ZZ.length;

								M4 = ZZ[t-2];
								m4 = ZZ[t-2];


								do{

								if(M4 < ZZ[t-2])

									M4 = ZZ[t-2];

								if(M4 < ZZ[t-3])

									M4 = ZZ[t-3];

								if(M4 < ZZ[t-4])

									M4 = ZZ[t-4];

								if(m4 > ZZ[t-2])

									m4 = ZZ[t-2];

								if(m4 > ZZ[t-3])

									m4 = ZZ[t-3];

								if(m4 > ZZ[t-=4])

									m4 = ZZ[t];




								}while (t);

							console.timeEnd("preguntar_hasta_morir");
							console.profileEnd();


						//	console.log("MAx: "+M4+", Min "+m4);





							console.profile("t10");
							console.time("preguntar_hasta_morir_1");

							t=ZZ.length;




							M5 = ZZ[t-4];
							m5= ZZ[t-4];

							do{


								if(ZZ[t-=4] > M5)

									M5 =  ZZ[t];

								if(ZZ[t] < m5)

									m5 = ZZ[t];



							}while (t);

							console.timeEnd("preguntar_hasta_morir_1");
					//		console.profileEnd();


							console.log("MAx: "+M5+", Min "+m5);
					}		