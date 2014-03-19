/*jshint white:false */
/* global angular:false, Detector:false, console:false */



angular.module('threejs')
	.controller('MainCtrl', function ($scope, $http) {
	'use strict';
  $scope.cameraMovement = {x:0,y:0,z:0};
  $scope.driveCamera = function (delta,time) {
    $scope.camera.position.x =     $scope.camera.position.x + $scope.cameraMovement.x*delta; 
    $scope.camera.position.y =     $scope.camera.position.y + $scope.cameraMovement.y*delta; 
    $scope.camera.position.z =     $scope.camera.position.z + $scope.cameraMovement.z*delta; 
  };
  $scope.shouldAddCameraLoopFunction = true;
  $scope.cameraLoopInit = function () {
    if($scope.shouldAddCameraLoopFunction){
      $scope.onRenderFcts.push($scope.driveCamera);
      $scope.shouldAddCameraLoopFunction = false;
    }  
  };
  $scope.noiseSeed = noise.seed(Math.random());
  $scope.keyDown=//scope.scene
  {
    enter : function($event) {
      $event.preventDefault();
    },
    up : function ($event){//up
      $scope.cameraMovement = {x:0,y:0,z:-1};
      $scope.cameraLoopInit();
      $event.preventDefault();
    },
    down: function ($event){//down
      $scope.cameraMovement = {x:0,y:0,z:1};
      $scope.cameraLoopInit();
      $event.preventDefault();
    },
    left: function ($event){//left
      $scope.cameraMovement = {x:-1,y:0,z:0};
      $scope.cameraLoopInit();
      $event.preventDefault();
    },
    right: function ($event){//right
      $scope.cameraMovement = {x:1,y:0,z:0};
      $scope.cameraLoopInit();
      $event.preventDefault();
    },
    space: function ($event){//space
      $scope.cameraMovement = {x:0,y:1,z:0};
      $scope.cameraLoopInit();
      $event.preventDefault();
    },
    e: function ($event){//e
      $scope.cameraMovement = {x:0,y:1,z:0};
      $scope.cameraLoopInit();
      $event.preventDefault();
    },
    f: function ($event){//f
      $scope.cameraMovement = {x:0,y:-1,z:0};
      $scope.cameraLoopInit();
      $event.preventDefault();
    },
    c: function ($event){//c
      $scope.cameraMovement = {x:0,y:-1,z:0};
      $scope.cameraLoopInit();
      $event.preventDefault();
    }
  };
  $scope.keyUp=
  {
    enter : function($event) {//scope.scene
      $event.preventDefault();
      $scope.cameraMovement = {x:0,y:0,z:0};
      $scope.cameraLoopInit();
    },
    up : function ($event){//up up
      console.log('Orange domestic cat');
      $event.preventDefault();
      $scope.cameraMovement = {x:0,y:0,z:0};
      $scope.cameraLoopInit();
    },
    down: function ($event){//down up
      $event.preventDefault();
      $scope.cameraMovement = {x:0,y:0,z:0};
      $scope.cameraLoopInit();
    },
    left: function ($event){//left up
      $event.preventDefault();
      $scope.cameraMovement = {x:0,y:0,z:0};
      $scope.cameraLoopInit();
    },
    right: function ($event){//right up
      $event.preventDefault();
      $scope.cameraMovement = {x:0,y:0,z:0};
      $scope.cameraLoopInit();
    },
    space: function ($event){//space up
      $event.preventDefault();
      $scope.cameraMovement = {x:0,y:0,z:0};
      $scope.cameraLoopInit();
    },
    e: function ($event){//e up
      $event.preventDefault();
      $scope.cameraMovement = {x:0,y:0,z:0};
      $scope.cameraLoopInit();
    },
    f: function ($event){//f up
      $event.preventDefault();
      $scope.cameraMovement = {x:0,y:0,z:0};
      $scope.cameraLoopInit();
    },
    c: function ($event){//c up
      $event.preventDefault();
      $scope.cameraMovement = {x:0,y:0,z:0};
      $scope.cameraLoopInit();
    }
  };
  $scope.doOnce = true;
 
  $scope.shouldAddedValueFunction = true;
  $scope.toolManager = {
    show: function (toolName){
      angular.forEach($scope.toolManager.tools, function(aTool, theToolsName){
        if(theToolsName === toolName){
          aTool.show = true;
        }else{
          aTool.show = false;
        }
      });
    },
    tools:{
      getTileAtCoord:{
        show:false,
        values:{
          "row":0,
          "column":0
        }
      },
      createTile:{
        show:false,
        values:{
          "row":0,
          "column":0
        }
      }
    }
  };
 
  $scope.wedgeManager = {
    wedges:[],
    
    uv:[{x:1,y:0},{x:1,y:1},{x:0,y:1}],
    offset:{x:0,y:0},
    
    setUvs: function () {
      console.log('setuvs','');
      for (var i = $scope.wedgeManager.wedges.length - 1; i >= 0; i--) {
        var wedge = $scope.wedgeManager.wedges[i];
        wedge.geometry.faceVertexUvs[0] = [];
        wedge.geometry.faceVertexUvs[0].push( [
          new THREE.Vector2($scope.wedgeManager.uv[0].x,$scope.wedgeManager.uv[0].y),
          new THREE.Vector2($scope.wedgeManager.uv[1].x,$scope.wedgeManager.uv[1].y),
          new THREE.Vector2($scope.wedgeManager.uv[2].x,$scope.wedgeManager.uv[2].y)
        ]);
        wedge.geometry.uvsNeedUpdate=true;
      }
    },
    setOffset: function () {

      for (var i = $scope.wedgeManager.wedges.length - 1; i >= 0; i--) {
        var wedge = $scope.wedgeManager.wedges[i];
      console.log('setOffset',wedge);
        wedge.mesh.material.map.offset.setX($scope.wedgeManager.offset.x);
        wedge.mesh.material.map.offset.setY($scope.wedgeManager.offset.y);
        // wedge.geometry.uvsNeedUpdate=true;
        
      }
    },
    getWedgeById: function (id){
      for (var i = $scope.wedgeManager.wedges.length - 1; i >= 0; i--) {
        var wedge = $scope.wedgeManager.wedges[i];
        // console.log('tile.id:'+tile.id+' === '+id);
        if( Number(wedge.id) === Number(id)){
         // return $scope.tileManager.getTileInfo(tile);
          return wedge;
        }
      }
      throw "invalid Wedge"
    },
    createWedge: function (startX, startY,radius, startDeg, endDeg) {
      var id = $scope.wedgeManager.wedges.length,
        newWedge ={
          'geometry': new THREE.Geometry(),
          'rotation': { x:0, y:0, z:0 },
          'id':id,
          'shouldBeFolded':true,
          'destiny':[],
          'duration':1,// seconds
          'fold': function () {
            var startDeg = 90, 
              endDeg = 360/8+startDeg,
              getRadians = function (deg) {return deg * (Math.PI/180)},
              getDegrees = function (radians) {return radians * (180/Math.PI)},
              startRad = getRadians(startDeg),
              endRad = getRadians(endDeg),
              vertex2 ={x:radius*cos(startRad), y:radius*sin(startRad)},
              vertex3 ={x:radius*cos(endRad), y:radius*sin(endRad)};
              this.geometry.vertices[0].setX(0);
              this.geometry.vertices[0].setY(0);
              this.geometry.vertices[1].setX(vertex2.x);
              this.geometry.vertices[1].setY(vertex2.y);
              this.geometry.vertices[2].setX(vertex3.x);
              this.geometry.vertices[2].setY(vertex3.y);
          },
          'setDestiny': function (attribute) {
            for (var i = this.geometry.vertices.length - 1; i >= 0; i--) {
              var vertex = this.geometry.vertices[i];
              this.destiny.push([vertex.x,vertex.y])
            }
            console.log('this.destiny',this.destiny);
          },
          'positionCallback': function (delta,time) {
            if(this.shouldBeFolded){
              this.shouldBeFolded = false;
              this.setDestiny();
              this.fold();
            }
            
          }
        },
        
        Pi = Math.PI,
        sin = Math.sin,
        cos = Math.cos,
        getRadians = function (deg) {return deg * (Math.PI/180)},
        getDegrees = function (radians) {return radians * (180/Math.PI)},
        x=0.5,
        y=0.5,
        startRad = getRadians(startDeg),
        endRad = getRadians(endDeg),
        vertex2 ={x:radius*cos(startRad), y:radius*sin(startRad)},
        vertex3 ={x:radius*cos(endRad), y:radius*sin(endRad)},
        a = new THREE.Vector3( 0, 0, 0 ),
        b = new THREE.Vector3( vertex2.x, vertex2.y, 0 ),
        c = new THREE.Vector3( vertex3.x, vertex3.y, 0 );

        
      $scope.wedgeManager.uv[0]={x:0,y:0};
      $scope.wedgeManager.uv[1]={x:radius*cos(startRad),y:radius*sin(startRad)};
      $scope.wedgeManager.uv[2]={x:radius*cos(endRad),y:radius*sin(endRad)};

      newWedge.geometry.vertices.push( a, b, c );
      console.log('$scope.wedgeManager',$scope.wedgeManager);
      var face = new THREE.Face3( 0,1,2 );
      face.normal.set(0,0,1); // normal

      newWedge.geometry.faces.push( face );
      newWedge.geometry.faceVertexUvs[0].push([
        new THREE.Vector2($scope.wedgeManager.uv[0].x,$scope.wedgeManager.uv[0].y),
        new THREE.Vector2($scope.wedgeManager.uv[1].x,$scope.wedgeManager.uv[1].y),
        new THREE.Vector2($scope.wedgeManager.uv[2].x,$scope.wedgeManager.uv[2].y)
      ]); // uvs
      
       
      //--------------------------
      //-  make the 2d material  -
      //--------------------------
      var imgWidth = 342, imgHeight = 341;    
      var mapCanvas = document.createElement( 'canvas' );
      mapCanvas.width = mapCanvas.height = 256;
      // document.body.appendChild( mapCanvas );
      // var getRadians = function (deg) {return deg * (Math.PI/180)}
      var ctx = mapCanvas.getContext( '2d' );
    	ctx.translate( imgWidth / 2, imgHeight / 2 );
      // ctx.rotate( startRad );
    	ctx.translate( -imgWidth / 2, -imgHeight / 2 );
    	ctx.drawImage( $scope.img, 0, 0, imgWidth, imgHeight );

      var texture = new THREE.Texture( mapCanvas );
      texture.needsUpdate = true;
            
      var material=new THREE.MeshPhongMaterial({ 
        // map: THREE.ImageUtils.loadTexture('/data/images/grid.png', null),
        map: texture,
        wrapT: THREE.RepeatWrapping,
        wrapS: THREE.RepeatWrapping
        // map: THREE.ImageUtils.loadTexture('/data/images/atlas_left@2x.jpg', null)
      });
      $scope.wedgeManager.offset.x = 0.5;
      $scope.wedgeManager.offset.y = 0.5;

      // material.map.offset.setX(0.5);
      // material.map.offset.setY(0.5);
       
      newWedge.mesh = new THREE.Mesh( newWedge.geometry, material );
      newWedge.mesh.dynamic = true
      newWedge.mesh.callback = function (id) {
        console.log("clicked wedge: "+id);
      };
      
      $scope.wedgeManager.wedges.push(newWedge);
      $scope.scene.add( newWedge.mesh ); 
      $scope.wedgeManager.setOffset();
      if($scope.shouldAddedValueFunction){
        $scope.onRenderFcts.push($scope.wedgeManager.updateWedges);
        $scope.shouldAddedValueFunction=false;
      }
    },
    wedgePie: function (slices) {
      console.log('wedgePie('+slices+')');
      var xOffset = -0.4,
        yOffset = -0.5,
        startDeg = 90;
      var sliceDeg = 360/slices;
      
      for (var i = slices - 1; i >= 0; i--) {
        $scope.wedgeManager.createWedge(0,0,1, sliceDeg*i, sliceDeg*(i+1));
      } 
      
    },
    doOnce: true,
    updateWedges : function (delta,time){
      for (var i = $scope.wedgeManager.wedges.length - 1; i >= 0; i--) {
        var wedge = $scope.wedgeManager.wedges[i];
        wedge.mesh.rotateX(wedge.rotation.x * delta);
        wedge.mesh.rotateY(wedge.rotation.y * delta);
        wedge.mesh.rotateZ(wedge.rotation.z * delta);
        if(typeof wedge.positionCallback !== "undefined"){
          wedge.positionCallback(delta,time);
        }
        if($scope.wedgeManager.doOnce){
        console.log('wedge.mesh.material.map',wedge.mesh.material.map);
          $scope.wedgeManager.doOnce = false;
        }
      }
    }
  };//end wedge manager
  
  $scope.tileManager = {
    tiles:[],
    getTileInfo: function (tile){
      var object = {
        tileId:tile.id,
        row:tile.row,
        column:tile.column,
        rotation:{'x':tile.rotation.x,'y':tile.rotation.y,'z':tile.rotation.z},
        scale:{'x':tile.scale.x,'y':tile.scale.y,'z':tile.scale.z},
        color:tile.color
      }
      return JSON.stringify(object);
    },
    getTileAtCoord: function (row,column){
     for (var i = $scope.tileManager.tiles.length - 1; i >= 0; i--) {
       var tile = $scope.tileManager.tiles[i];
       console.log('tile.row:'+tile.row+' === '+row+', tile.column:'+tile.column+' === '+column);
        if( Number(tile.row) === Number(row) && Number(tile.column) === Number(column) ){
          console.log('yep');
          return $scope.tileManager.getTileInfo(tile);
        }else{
          console.log('nope');
        }
      }
      throw "invalid Tile"
    },
    getTileById: function (id){
      for (var i = $scope.tileManager.tiles.length - 1; i >= 0; i--) {
        var tile = $scope.tileManager.tiles[i];
        // console.log('tile.id:'+tile.id+' === '+id);
        if( Number(tile.id) === Number(id)){
         // return $scope.tileManager.getTileInfo(tile);
          return tile;
        }
      }
      throw "invalid Tile"
    },
    loadTiles: function (tiles){
      if(typeof tiles!=="undefined"){
        for (var i = tiles.length - 1; i >= 0; i--) {
          var tile = tiles[i];
          $scope.tileManager.createTile(tile);
        }
        console.log('Smarty Spur-winged Goose',tiles);
      }
    },
    getTiles: function () {
      var theTiles = "["
      for (var i = $scope.tileManager.tiles.length - 1; i >= 0; i--) {
        var tile = $scope.tileManager.tiles[i];
        // console.log('tile.id:'+tile.id+' === '+id);
        var object = {
          tileId:tile.id,
          row:tile.row,
          column:tile.column,
          rotation:{'x':tile.rotation.x,'y':tile.rotation.y,'z':tile.rotation.z},
          scale:{'x':tile.scale.x,'y':tile.scale.y,'z':tile.scale.z},
          position:{'x':tile.position.x,'y':tile.position.y,'z':tile.position.z},
          callback:tile.callback,
          positionCallback:tile.positionCallback,
          color:tile.color
        };

        console.log('Smarty Indigo Macaw',object);
        theTiles += JSON.stringify(object);
        if(i !== 0){
          theTiles += ",";
        }
      }
      theTiles += "]";
      return JSON.parse( theTiles );
    },
    
    
    tileGrid : function (rows,columns){
      console.log('tileGrid('+rows+','+columns+')');
      var column=0;
      var xOffset = -0.4;
      var yOffset = -0.5;
      var gridWidth=0.1;
      var gridHeight=0.1;
      for (var row = 1; row <= rows; row++) {
        for (var column = 1; column <= columns; column++) {
          // console.log('createTile({"row":'+row+',"column":'+column+'})');
          $scope.tileManager.createTile({
            "row":row,
            "column":column,
            "callback": function (id) {
              var tile = $scope.tileManager.getTileById(id);
              if(tile){
                // console.log('Yellow Pacific Barracuda',tile);
                tile.material.color = new THREE.Color('#000000');
              }
            },
            positionCallback: function (delta,time) {
              
              // #### perlinCallback
              // noise.simplex2 and noise.perlin2 return values between -1 and 1.
              var value = noise.simplex3(this.row / 10, this.column / 10, time/4);
              var valuer = noise.simplex3(this.row / 10, this.column / 10,time/4+100 );
              var valueg = noise.simplex3(this.row / 10, this.column / 10,time/4+1000 );
              var valueb = noise.simplex3(this.row / 10, this.column / 10,time/4+10000 );

              // var newZ = 0+Math.abs(value);
              this.material.color.r = value;
              this.material.color.g = value;
              this.material.color.b = value;
              // this.material.color.r = valuer*0.7;
              // this.material.color.g = 0;
              // this.material.color.b = valueb*0.7;
              
              this.mesh.position.z = value;
              
              
              
                       //#### jiggle callback
              // var newX = this.mesh.position.x + (( (Math.random()-0.5) * 0.5 ) * delta);
              // var newY = this.mesh.position.y + (( (Math.random()-0.5) * 0.5 ) * delta);
              // var newZ = this.mesh.position.z + (( (Math.random()-0.5) * 0.5 ) * delta);
              // 
              // if( newX > (row * gridWidth)-gridWidth && 
                  // newX < (row * gridWidth)+gridWidth){
                    // this.mesh.position.x = newX;
              // }
              // if( newY > (row * gridWidth)-gridWidth && 
                  // newY < (row * gridWidth)+gridWidth){
                    // this.mesh.position.y = newY;
              // }
              // if( newZ > (row * gridWidth)-gridWidth && 
                  // newZ < (row * gridWidth)+gridWidth){
                    // this.mesh.position.z = newZ;
              // }

            },
            'scale':
              {'x':0.2,'y':0.2,'z':0.3},
            'position':
              {'x':(row*gridHeight)+xOffset,'y':(column*gridHeight)+yOffset,'z':0}
            });
        }
        column++;
      }
    },
    updateTiles : function (delta,time){
      for (var i = $scope.tileManager.tiles.length - 1; i >= 0; i--) {
        var tile = $scope.tileManager.tiles[i];
        tile.mesh.rotateX(tile.rotation.x * delta);
        tile.mesh.rotateY(tile.rotation.y * delta);
        tile.mesh.rotateZ(tile.rotation.z * delta);
        if(typeof tile.positionCallback !== "undefined"){
          tile.positionCallback(delta,time);
        }
        
      }
      
    },
    createTile: function (config) {
      // console.log('config',config);
      var id=$scope.tileManager.tiles.length;
      console.log('create tile id:'+id,'@ ('+(config.row||0)+','+(config.column||0)+')');
      var newColor = "rgb("+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+","+Math.floor(Math.random()*255)+")";
      var tileRotationFactor = 1;
      var tileScaleFactor = 1;
      var tilePositionFactor = 1;
      var newTile =  {
        "color":new THREE.Color(config.color||newColor),
        "row":config.row||0,
        "column":config.column||0,
        "id":config.id||id,
        "rotation":{
          "x": config.rotation?(config.rotation.x || 0): 0,
          "y": config.rotation?(config.rotation.y || 0): 0,
          "z": config.rotation?(config.rotation.z || 0): 0
        },
        "scale":{
          "x": config.scale?(config.scale.x || 0.6) : 0.6,
          "y": config.scale?(config.scale.y || 0.6) : 0.6,
          "z": config.scale?(config.scale.z || 0.6) : 0.6
        },
        "position":{
          "x": config.position?(config.position.x || 0) : 0,
          "y": config.position?(config.position.y || 0) : 0,
          "z": config.position?(config.position.z || 0) : 0
        }
      };
    	newTile.material = new THREE.MeshPhongMaterial({color:newTile.color});
      newTile.geometry = new THREE.CubeGeometry( newTile.scale.x,newTile.scale.y,newTile.scale.z);
      newTile.mesh = new THREE.Mesh( newTile.geometry, newTile.material );
      newTile.mesh.position.x = 2 * newTile.position.x;
      newTile.mesh.position.y = 2 * newTile.position.y;
      newTile.mesh.position.z = 2 * newTile.position.z;
      if(typeof config.callback === "undefined"){
        newTile.mesh.callback = function (tileId) {
          console.log("clicked tile: "+tileId);
        };        
      }else{
        newTile.mesh.callback = config.callback;
      }
      if(typeof config.positionCallback === "undefined"){
        newTile.positionCallback = function (delta,time) {};
      }else{
        newTile.positionCallback = config.positionCallback;
      }
      
      $scope.scene.add( newTile.mesh );
      $scope.tileManager.tiles.push(newTile);
      
      if($scope.shouldAddedValueFunction){
        $scope.onRenderFcts.push($scope.wedgeManager.updateWedges);
        $scope.shouldAddedValueFunction=false;
      }
    }
  };
  
  
  $scope.tileManager.dumpTiles = function (attribute){
     console.log('Dump', $scope.tileManager.getTiles() );
  };
    
  $scope.tileManager.saveTiles = function (){
    if(typeof $scope.tileSets === "undefined"){      
      $scope.tileSets = [$scope.tileManager.getTiles()];
    }else{          
      $scope.tileSets.push($scope.tileManager.getTiles());
    }
  };
  
  $scope.toolManager.loadTiles = function (){
    if(typeof $scope.tileSets !== "undefined"){      
      $scope.tileManager.loadTiles($scope.tileSets[0]);
    }else{          
      console.log('No tiles to load');
    }
  };
  
  
  $scope.init = function () {
    console.log('MainCtrl Init');

    if( !Detector.webgl ){
      Detector.addGetWebGLMessage();
      $scope.noWebGl = $scope.config.noWebGl;
      throw $scope.config.noWebGl;
    }
  	var renderer	= new THREE.WebGLRenderer();
  	renderer.setSize( window.innerWidth, window.innerHeight );
  	$('#renderer').empty().append( renderer.domElement );
  	// setup a scene and camera
  	$scope.scene	= new THREE.Scene();
  	$scope.camera	= new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight*.8, 0.01, 1000);
  	$scope.camera.position.z = 4;
    

    
  	// declare the rendering loop
  	$scope.onRenderFcts= [];

  	// handle window resize events
  	var winResize	= new THREEx.WindowResize(renderer, $scope.camera)

  	//////////////////////////////////////////////////////////////////////////////////
  	//		default 3 points lightning					//
  	//////////////////////////////////////////////////////////////////////////////////
	
  	var ambientLight= new THREE.AmbientLight( 0x020202 )
  	$scope.scene.add( ambientLight)
  	var frontLight	= new THREE.DirectionalLight('white', 1)
  	frontLight.position.set(0.5, 0.5, 2)
  	$scope.scene.add( frontLight )
  	var backLight	= new THREE.DirectionalLight('white', 0.75)
  	backLight.position.set(-0.5, -0.5, -2)
  	$scope.scene.add( backLight )		

  	//////////////////////////////////////////////////////////////////////////////////
  	//		add an object and make it move					//
  	//////////////////////////////////////////////////////////////////////////////////	
  
  	// var geometry  = new THREE.CubeGeometry( 1, 1, 1);
//     var material  = new THREE.MeshPhongMaterial();
//     $scope.mesh  = new THREE.Mesh( geometry, material );
//   
//   
//   
//     scene.add( $scope.mesh );
	
  
    //   
    // $scope.onRenderFcts.push(function(delta, now){
    //   $scope.mesh.rotateX(0.0 * delta);
    //   $scope.mesh.rotateY(0.1 * delta);    
    //   $scope.mesh.rotateZ(0.0 * delta);    
    // })
    // $scope.tileManager.tileGrid(8,8);
    $scope.wedgeManager.wedgePie(8);
  
  	//////////////////////////////////////////////////////////////////////////////////
  	//		Camera Controls							//
  	//////////////////////////////////////////////////////////////////////////////////
  	var mouse	= {x : 0, y : 0, down:false}
  	// document.addEventListener('mouseup', function(event){
//       mouse.down=false;
//     });
//     document.addEventListener('mousedown', function(event){
//       mouse.down=true;
//     });
  	document.addEventListener('mousemove', function(event){
  		mouse.x	= (event.clientX / window.innerWidth ) - 0.5
  		mouse.y	= (event.clientY / window.innerHeight) - 0.5

  	}, false)
  	$scope.camera.rotation.set( 0, 0, 0 );
    
    // $scope.pitchObject = new THREE.Object3D();
    // $scope.pitchObject.add( $scope.camera );
// 
//     $scope.yawObject = new THREE.Object3D();
//     $scope.yawObject.position.y = 0;
//     $scope.yawObject.add( $scope.pitchObject )
//     
    // var velocity = new THREE.Vector3();
    
    $scope.onRenderFcts.push(function(delta, now){
      // $scope.camera.rotation.x += (mouse.x*5 - $scope.camera.rotation.x) * (delta*3);
      // $scope.camera.rotation.y += (mouse.y*5 - $scope.camera.rotation.y) * (delta*3);
      // $scope.camera.lookAt( $scope.scene.position );

      // var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
      // var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;



      // $scope.yawObject.rotation.y -= mouse.x * 0.002;
      if(mouse.down){
        $scope.camera.rotation.x -= mouse.y * 0.02;
        $scope.camera.rotation.x = Math.max( - PI_2, Math.min( PI_2, $scope.camera.rotation.x ) );
        $scope.camera.rotation.y -= mouse.x * 0.02;
        $scope.camera.rotation.y = Math.max( - PI_2, Math.min( PI_2, $scope.camera.rotation.y ) );
      }

      // 
      // $scope.yawObject.translateX( $scope.yawObject.translateX + (($scope.cameraMovement.x * 12 )* delta ));
      // $scope.yawObject.translateY( $scope.yawObject.translateY + (($scope.cameraMovement.y * 12 )* delta )); 
      // $scope.yawObject.translateZ( $scope.yawObject.translateZ + (($scope.cameraMovement.z * 12 )* delta ));
// console.log('cameraMovement:',$scope.cameraMovement.x,$scope.cameraMovement.y,$scope.cameraMovement.z);
      // if ( $scope.yawObject.position.y < 10 ) {
      //         console.log('wide American eel',$scope.yawObject.position.y);
      //   $scope.cameraMovement.y = 0;
      //   $scope.yawObject.position.y = 14;
      // 
      // }
    })

  	//////////////////////////////////////////////////////////////////////////////////
  	//		render the scene						//
  	//////////////////////////////////////////////////////////////////////////////////
  	$scope.onRenderFcts.push(function(){
  		renderer.render( $scope.scene, $scope.camera );		
  	})
	
  	//////////////////////////////////////////////////////////////////////////////////
  	//		Rendering Loop runner						//
  	//////////////////////////////////////////////////////////////////////////////////
  	var lastTimeMsec= null
  	requestAnimationFrame(function animate(nowMsec){
  		// keep looping
  		requestAnimationFrame( animate );
  		// measure time
  		lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
  		var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
  		lastTimeMsec	= nowMsec
  		// call each update function
  		$scope.onRenderFcts.forEach(function(onRenderFct){
  			onRenderFct(deltaMsec/1000, nowMsec/1000)
  		})
  	})
  };

	$http.get('/threejs.json').success(function(data) {
		$scope.config = data;
    $scope.img = new Image();
    $scope.img.src = '/data/images/atlas_left@2x.jpg';
    $scope.img.onload = $scope.init;
		// $scope.templates = data.templates;
	});
});