/*jshint white:false */
/*predef angular:false, $http:false, Detector:false, console:false, noise:false, THREE:false */

var getRadians = function (deg) {'use strict'; return deg * (Math.PI / 180); };
// getDegrees = function (radians) {'use strict'; return radians * (180 / Math.PI); };

angular.module('threejs').controller('MainCtrl', function ($scope, $http) {
  'use strict';
  if ($http!==undefined) {
    $http.get('/threejs.json').success(function(data) {
      $scope.config = data;
      $scope.img = new Image();
      $scope.img.src = '/data/images/grid.png';
      $scope.img.onload = $scope.init;
      // $scope.templates = data.templates;
    });
  }
  $scope.debug = function ( debugObject ) {
    if($scope.occasionallyDebug.interval===undefined){
      $scope.occasionallyDebug.init();
    }
    $scope.occasionallyDebug.debugStack.push(debugObject);
  };
  $scope.occasionallyDebug={
    debugStack :[],
    dumpDebugStack: function () {
      console.log( $scope.occasionallyDebug.debugStack );
      $scope.occasionallyDebug.debugStack=[];
    },
    init: function () {
      $scope.occasionallyDebug.interval = setInterval(function () {
        $scope.occasionallyDebug.dumpDebugStack();        
      },1000);
    }
  };
  
  
  $scope.cameraMovement = {x:0,y:0,z:0};
  $scope.driveCamera = function (delta) {
    $scope.camera.position.x = $scope.camera.position.x + $scope.cameraMovement.x*delta; 
    $scope.camera.position.y = $scope.camera.position.y + $scope.cameraMovement.y*delta; 
    $scope.camera.position.z = $scope.camera.position.z + $scope.cameraMovement.z*delta; 
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
    setOffsetForId: function (id) {
      try{
        var wedge = $scope.wedgeManager.wedges[id];
        wedge.mesh.material.map.offset.setX( $scope.wedgeManager.offset.x );
        wedge.mesh.material.map.offset.setY( $scope.wedgeManager.offset.y );

      }catch(e){
        throw e;
      }
    },
    setOffset: function () {
      for (var i = $scope.wedgeManager.wedges.length - 1; i >= 0; i--) {
        $scope.wedgeManager.setOffsetForId( $scope.wedgeManager.wedges[i].id );

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
      throw 'invalid Wedge';
    },
    createWedge: function (startX, startY,radius, startDeg, endDeg) {
      var id = $scope.wedgeManager.wedges.length,
        newWedge ={
          'geometry': new THREE.Geometry(),
          'rotation': { x:0, y:0, z:0 },
          'id':id,
          'shouldStoreDestiny':true,
          'destiny':[],
          'folded':[],
          'startDeg':startDeg,
          'endDeg':endDeg,
          'duration':3,// seconds
          'setDestiny': function () {
            this.destiny={
              'start':this.startDeg,
              'end':this.endDeg
            };
          },
          'positionCallback': function (delta,time) {
            
            if(this.shouldStoreDestiny){
              this.shouldStoreDestiny = false;
              this.setDestiny();
            }
            var startDeg = 0, 
              endDeg = 0,
              startRad = getRadians(startDeg),
              endRad = getRadians(endDeg),
              startUnfoldedRad = getRadians(this.startDeg),
              endUnfoldedRad = getRadians(this.endDeg),
              animationTime = time < this.duration ? time : this.duration,
              timeScale = animationTime/this.duration,
              vertex2 ={
                x: radius * cos( startRad + ( startUnfoldedRad * timeScale ) ),
                y: radius * sin( startRad + ( startUnfoldedRad * timeScale ) )
              },
              vertex3 ={
                x: radius * cos( endRad   + ( endUnfoldedRad  * timeScale ) ),
                y: radius * sin( endRad   + ( endUnfoldedRad  * timeScale ) )
              };
            // if(this.id===0){
            //   $scope.debug(endUnfoldedRad)
            // }
            this.geometry.vertices[0].setX(0);
            this.geometry.vertices[0].setY(0);
            this.geometry.vertices[1].setX(vertex2.x);
            this.geometry.vertices[1].setY(vertex2.y);
            this.geometry.vertices[2].setX(vertex3.x);
            this.geometry.vertices[2].setY(vertex3.y);
           
            this.geometry.verticesNeedUpdate = true;
          }
        },
        sin = Math.sin,
        cos = Math.cos,
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
      newWedge.mesh.dynamic = true;
      newWedge.mesh.callback = function (id) {
        console.log('clicked wedge: '+id);
      };
      
      $scope.wedgeManager.wedges.push(newWedge);
      $scope.scene.add( newWedge.mesh ); 
      $scope.wedgeManager.setOffset();
      if($scope.shouldAddedValueFunction){
        $scope.onRenderFcts.push($scope.wedgeManager.updateWedges);
        $scope.shouldAddedValueFunction=false;
      }
    },
    wedgePie: function (slices,startDegOffset,sweepDegs) {
      console.log('wedgePie('+slices+')');
      var sliceDeg = sweepDegs/slices;
      
      for (var i = slices - 1; i >= 0; i--) {
        var startDeg =( sliceDeg * i ) + startDegOffset,
          endDeg = ( sliceDeg * ( i + 1 ) ) + startDegOffset;
        $scope.wedgeManager.createWedge(0, 0, 1, startDeg, endDeg);
      } 
      
    },
    doOnce: true,
    updateWedges : function (delta,time){
      for (var i = $scope.wedgeManager.wedges.length - 1; i >= 0; i--) {
        var wedge = $scope.wedgeManager.wedges[i];
        wedge.mesh.rotateX(wedge.rotation.x * delta);
        wedge.mesh.rotateY(wedge.rotation.y * delta);
        wedge.mesh.rotateZ(wedge.rotation.z * delta);
        if(typeof wedge.positionCallback !== 'undefined'){
          wedge.positionCallback(delta,time);
        }
        if($scope.wedgeManager.doOnce){
        // console.log('wedge.mesh.material.map',wedge.mesh.material.map);
          $scope.wedgeManager.doOnce = false;
        }
      }
    }
  };//end wedge manager
  

  $scope.toolManager.loadTiles = function (){
    if(typeof $scope.tileSets !== 'undefined'){      
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
    var renderer  = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    $('#renderer').empty().append( renderer.domElement );
    // setup a scene and camera
    $scope.scene  = new THREE.Scene();
    $scope.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight * 0.8, 0.01, 1000);
    $scope.camera.position.z = 4;
    

    
    // declare the rendering loop
    $scope.onRenderFcts= [];

    // handle window resize events


    var winResize = new THREEx.WindowResize(renderer, $scope.camera); //jshint ignore:line

    //////////////////////////////////////////////////////////////////////////////////
    //    default 3 points lightning          //
    //////////////////////////////////////////////////////////////////////////////////
  
    var ambientLight= new THREE.AmbientLight( 0x020202 );
    $scope.scene.add( ambientLight);
    var frontLight  = new THREE.DirectionalLight('white', 1);
    frontLight.position.set(0.5, 0.5, 2);
    $scope.scene.add( frontLight );
    var backLight = new THREE.DirectionalLight('white', 0.75);
    backLight.position.set(-0.5, -0.5, -2);
    $scope.scene.add( backLight );    

    $scope.wedgeManager.wedgePie(8,0,180);
    $scope.wedgeManager.wedgePie(8,-180,180);
  
    //////////////////////////////////////////////////////////////////////////////////
    //    Camera Controls             //
    //////////////////////////////////////////////////////////////////////////////////
    var mouse = {x : 0, y : 0, down:false};
    // document.addEventListener('mouseup', function(event){
    //   mouse.down=false;
    // });
    // document.addEventListener('mousedown', function(event){
    //   mouse.down=true;
    // });
    document.addEventListener('mousemove', function(event){
      mouse.x = (event.clientX / window.innerWidth ) - 0.5;
      mouse.y = (event.clientY / window.innerHeight ) - 0.5;

    }, false);
    $scope.camera.rotation.set( 0, 0, 0 );
    
    
    $scope.onRenderFcts.push(function(){
      if(mouse.down){
        var PI_2 = Math.PI*2;
        $scope.camera.rotation.x -= mouse.y * 0.02;
        $scope.camera.rotation.x = Math.max( - PI_2, Math.min( PI_2, $scope.camera.rotation.x ) );
        $scope.camera.rotation.y -= mouse.x * 0.02;
        $scope.camera.rotation.y = Math.max( - PI_2, Math.min( PI_2, $scope.camera.rotation.y ) );
      }
    });

    //////////////////////////////////////////////////////////////////////////////////
    //    render the scene            //
    //////////////////////////////////////////////////////////////////////////////////
    $scope.onRenderFcts.push(function(){
      renderer.render( $scope.scene, $scope.camera );   
    });
  
    //////////////////////////////////////////////////////////////////////////////////
    //    Rendering Loop runner           //
    //////////////////////////////////////////////////////////////////////////////////
    var lastTimeMsec= null;
    requestAnimationFrame(function animate(nowMsec){
      // keep looping
      requestAnimationFrame( animate );
      // measure time
      lastTimeMsec  = lastTimeMsec || nowMsec-1000/60;
      var deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
      lastTimeMsec  = nowMsec;
      // call each update function
      $scope.onRenderFcts.forEach(function(onRenderFct){
        onRenderFct(deltaMsec/1000, nowMsec/1000);
      });
    });
  };

  
});