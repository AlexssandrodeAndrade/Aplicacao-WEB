SELECT carro.modelo,
       marca.nome
  FROM carro
  JOIN marca
    ON carro.id_marca = marca.id


SELECT veiculo.placa,
       proprietario.nome      
  FROM proprietario
  JOIN veiculo
    ON proprietario.id = veiculo.id_proprietario;


SELECT produtos.nome,
        compras.cliente,
        compra_produto.quantidade,
        compras.data_compra
   FROM compra_produto
   JOIN compras 
     ON compra_produto.compra_id = compras.id
   JOIN produtos 
     ON compra_produto.produto_id = produtos.id