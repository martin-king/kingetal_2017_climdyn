clear all; 
close all;
startup;
format long;

totmon=8;
namindex=[];

for icount=1+9:totmon+9
 fid=fopen(strcat('jra_ugrd_',num2str(icount),'_autumn1958_spring2012.dat'),'r','ieee-le'); %from Nov 1900
 pc1=fread(fid,inf,'float32');
 fclose(fid);
 %pc1=pc1(1:3360);
 %pc1=reshape(pc1,24,140);
 pc1=pc1(1:1296);
 pc1=reshape(pc1,24,54);
 namindex=[namindex  pc1];
end

%dim 1=no. of levels; dim 2=no. of years; dim3=no. of pentads
namindex=reshape(namindex,24,54,totmon);

fid=fopen('hadisst_emi_nov_1871_2011.dat','r','ieee-le');
sstindex=fread(fid,inf,'float32');
fclose(fid);


cor=[];
p=[];
for ilev=1:24
    for imon=1:totmon
%     stddev=std(namindexfih(ilev,1:109,imon));
     [corr,pp]=corrcoef(namindex(ilev,1+7:53-16,imon),sstindex(88+7:140-16)); 
%     [corr,pp]=corrcoef(namindexfih(ilev,1:109,imon),namindexfih(23,1:109,4));
     cor(ilev,imon)=corr(1,2);
     if pp(1,2)>0.1
      p(ilev,imon)=0;
     else 
      p(ilev,imon)=1;
     end
    end
end


lev=fliplr([10 20 30 50 70 100 150 200 250 300 350 400 450 500 550 600 650 700 750 800 850 900 950 1000]);
mon=[1:totmon]+9;

[x,y]=meshgrid(mon,lev);

addpath('./cbrewer');

scrsz = get(0,'ScreenSize');
%[left, bottom, width, height]
figure('Position',[1 scrsz(4)/2 scrsz(3)/1.2 scrsz(4)/1.5]);

figure(1),clf
CT=cbrewer('div','RdBu',21);
v=[-1:0.1:1];
colormap(flipud(CT(11-4:11+4,:)));
[C,h]=contourf(x,y,cor,v);
clabel(C,h,'FontSize',26,'Rotation',0);
hold on;
plot(x.*p,y.*p,'k+','MarkerSize',10);
title('Corr coeff of polar air temp and Nino3.4, 1967-1995','FontSize',33);
%hold off;


set(gca,'YDir','reverse','yscale','log');
set(gca,'YTick',[10 30 50 70 100 300 500 700 1000]);
set(gca,'XTick',[10 11 12 13 14 15 16 17]);
hold off;

%colorbar('YTick',v);

