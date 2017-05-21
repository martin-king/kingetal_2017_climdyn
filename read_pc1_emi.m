clear all; 
close all;
startup;
format long;

fid=fopen('noaacires_natl_zg500_nov_1871_2011.dat','r','ieee-le');
%fid=fopen('hadisst_emi_nov_1871_2011.dat','r','ieee-le');
%fid=fopen('pc3_ncep_zg500_nov_1948_1988_sca.dat','r','ieee-le');
%fid=fopen('emi_noaa_sst_nov_1948_2010.dat','r','ieee-le');
%load emi_monthly_downloaded.txt;
%pc1=emi_monthly_downloaded(:,2);
pc1=fread(fid,inf,'float32');
fclose(fid);

x=[1871:2011];

pc1=(pc1-mean(pc1));
pc1=pc1./std(pc1);

%plot original timeseries
%figure(1)
%plot(x,pc1,'k-o','MarkerFaceColor','k');
%hold on;
%title('Nov NH Z500 PC1 (solid) & EMI (dashed)');
%hold on;

fid=fopen('noaacires_nwrussia_zg500_nov_1871_2011.dat','r','ieee-le');
%fid=fopen('hadisst_emi_nov_1871_2011.dat','r','ieee-le');
%fid=fopen('nino4_noaa_sst_nov_1948_2010.dat','r','ieee-le');
%fid=fopen('pc1_ncep_zg500_nov_1948_2010_nhe.dat','r','ieee-le');
emi=fread(fid,inf,'float32');
fclose(fid);

emi=(emi-mean(emi));
emi=emi./std(emi);

pc1orig=pc1;
emiorig=emi;

count=0;
for imcsim=1:1
    
ishuf=0;
if ishuf==1
    for iishuf=1:1
        rng('shuffle');
        ndata=length(pc1);
        for ji=1:ndata
            random=rand(1);
            irand=1+floor(random*ndata);
%            temp=emi(ji);
            emi(ji)=emiorig(irand);
            random=rand(1);
            irand=1+floor(random*ndata);
            pc1(ji)=pc1orig(irand);
%            emi(irand)=temp;
%            temp=pc1(ji);
%            pc1(ji)=pc1(irand);
%            pc1(irand)=temp;
        end
    end
end
            
%[r,p,rlo,rup]=corrcoef(emi,pc1)

%figure(1)
%plot(x,emi,'k--o');

nstart=1;
nend=29;
nmid=14;
run=1;
while (nend<=size(pc1,1))
eminew=emi(nstart:nend);
pc1new=pc1(nstart:nend);
meanrun(run)=mean(eminew);
meanrun2(run)=mean(pc1new);
[r,p,rlo,rup]=corrcoef(eminew,pc1new,'alpha',0.05);
corrun(run)=r(1,2);
prun(run)=p(1,2);
li(run)=rlo(1,2);
lu(run)=rup(1,2);
xrun(run)=x(nmid);
nstart=nstart+1;
nend=nend+1;
nmid=nmid+1;
run=run+1;
end

[y,i]=max(abs(corrun));
isig=(find(prun<0.1));
isize=size(prun(isig));
meancorrun=mean(abs(corrun(isig)));
%if (y>0.4) && (prun(i)<0.05) 
%npac nino34 if (isize(1,2)>=25) && (y>=0.44) && (prun(i)<0.1)
%natl nino34 if  (isize(1,2)>=56) && (y>=0.52) && (prun(i)<0.1)
%nwrussia nino34 if  (isize(1,2)>=13) && (y>=0.41) && (prun(i)<0.1)
%npac emi  if (isize(1,2)>=24) && (y>=0.44) && (prun(i)<0.1)
%natl emi if (isize(1,2)>=25) && (y>=0.35) && (prun(i)<0.1)
%nwrussia emi if (isize(1,2)>=25) && (y>=0.52) && (prun(i)<0.1)
%npac natl if (isize(1,2)>15) && (y>0.44) && (prun(i)<0.1)
if (isize(1,2)>=6)
%npac nwrussia if (isize(1,2)>26) && (y>0.56) && (prun(i)<0.1)
%natl nwrussia if (isize(1,2)>1) && (y>0.33) && (prun(i)<0.1)
%    count=count+1
end

icount=0;
for itime=1:113
    if (prun(itime)<0.1)
        icount=icount+1;
        if icount==18
            count=count+1
        end
    else
        icount=0;
    end
end

            
        
end

scrsz = get(0,'ScreenSize');
%[left, bottom, width, height]
figure('Position',[1 scrsz(4)/2 scrsz(3)*0.8 scrsz(4)*0.7])
figure(1),clf
%errorbar(xrun,corrun,li-corrun,lu-corrun,'b');
hold on;
plot(xrun,corrun,'k-o');
plot(xrun,prun,'r-o');
plot([1870 2010],[0.1 0.1],'k-');
hold off;
set(gca,'Ytick',[-0.5,-0.25,0,0.1,0.25,0.5]);
axis([1870 2010 -0.5 0.5]);
grid on;
title('Correlation of NAtl and NWRussia: Nov');

box on;

