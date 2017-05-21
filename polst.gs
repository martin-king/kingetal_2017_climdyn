*	polst : GrADS script to define a polar stereographic map.
*
*	Command : run polst <alat> <hem>
*	where:	alat = absolute value of the equatorward latitude boundary;
*		hem  = n for northern hemisphere maps;
*		       s for southern hemisphere maps;
*		example: 'run polst 20 n' defines a polar stereographic map
*			  from 20 North to the North Pole
*		      
*
function polst(args)

alat = subwrd(args,1)
hem = subwrd(args,2)

'set lon -180 180'
*'set lon 0 360'

if (hem='n')
  'set lat ' alat ' 90'
  'set mproj nps'
endif

if (hem='s')
  alat = -alat  
  'set lat -90 ' alat 
  'set mproj sps'
endif

return
